import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── BACKEND CALL ─────────────────────────────────────────────────────────────
// Replace this with your real API call.
// Expected response shape:
// {
//   activity: "Omra",
//   session: "Winter Session 2024",
//   participants: [...],
//   winners: [...],
//   waitingList: [...]
// }
async function fetchDrawResults(sessionId) {
  // TODO: replace with your real endpoint:
  // const res = await fetch(`/api/draw/launch/${sessionId}`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // });
  //
  // if (!res.ok) throw new Error("Failed to execute draw");
  // return res.json();

  // ---- MOCK (remove when wiring backend) ----
  await new Promise((r) => setTimeout(r, 1200));

  const names = [
    "Yacine Bensaïd",
    "Nadia Meziane",
    "Karim Touati",
    "Samira Ghezali",
    "Rania Belkacem",
    "Walid Merabet",
    "Lina Derradji",
    "Sofiane Rahmani",
    "Ahmed Kherfi",
    "Imene Boulahbel",
    "Farid Boudiaf",
    "Nour El Houda M.",
    "Reda Kaci",
    "Salima H.",
    "Omar Kessal",
  ];

  const shuffled = [...names].sort(() => Math.random() - 0.5);

  return {
    activity: "Excursion à Djanet",
    session: `Session ${sessionId}`,
    participants: names,
    winners: shuffled.slice(0, 5),
    waitingList: shuffled.slice(5, 8),
  };
  // -------------------------------------------
}

const SLICE_COLORS = [
  "#ED8D31",
  "#F59E0B",
  "#D97706",
  "#FB923C",
  "#C2410C",
  "#F97316",
  "#B45309",
  "#FDBA74",
  "#EA580C",
  "#FED7AA",
  "#C05621",
  "#DD6B20",
  "#F6AD55",
  "#FBD38D",
  "#9C4221",
];

const WINNER_COLOR = "#F59E0B";
const WAITING_COLOR = "#818CF8";

// ── Canvas renderer ───────────────────────────────────────────────────────────
// Wheel WITHOUT names on slices
function drawWheel(canvas, items, rotation, highlightIdx = null) {
  const ctx = canvas.getContext("2d");
  const sz = canvas.width;
  const cx = sz / 2;
  const cy = sz / 2;
  const r = cx - 8;
  const n = items.length;
  if (!n) return;
  const slice = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, sz, sz);

  // glow
  ctx.save();
  ctx.shadowColor = "rgba(237,141,49,0.28)";
  ctx.shadowBlur = 48;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#0f172a";
  ctx.fill();
  ctx.restore();

  for (let i = 0; i < n; i++) {
    const start = rotation + i * slice;
    const end = start + slice;
    const isHl = i === highlightIdx;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, isHl ? r + 6 : r, start, end);
    ctx.closePath();
    ctx.fillStyle = isHl ? WINNER_COLOR : SLICE_COLORS[i % SLICE_COLORS.length];
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.13)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // rim
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // hub
  const hub = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, 22);
  hub.addColorStop(0, "#ffffff");
  hub.addColorStop(1, "#94a3b8");
  ctx.beginPath();
  ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
  ctx.fillStyle = hub;
  ctx.fill();
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (!active || !ref.current) return;

    const c = ref.current;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const ctx = c.getContext("2d");

    const pts = Array.from({ length: 200 }, () => ({
      x: Math.random() * c.width,
      y: -20 - Math.random() * c.height,
      w: 6 + Math.random() * 9,
      h: 4 + Math.random() * 6,
      col: SLICE_COLORS[Math.floor(Math.random() * SLICE_COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2.5 + Math.random() * 5,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 9,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rv;

        if (p.y > c.height) {
          p.y = -10;
          p.x = Math.random() * c.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      raf.current = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}

// ── Results panel ─────────────────────────────────────────────────────────────
function ResultsPanel({
  winners,
  waitingList,
  revealedWinners,
  revealedWaiting,
}) {
  const Row = ({ name, index, revealed, accent, emoji }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 10,
        background: revealed ? `${accent}18` : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          revealed ? `${accent}55` : "rgba(255,255,255,0.07)"
        }`,
        transition: "all 0.45s ease",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          flexShrink: 0,
          background: revealed ? accent : "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color:
            revealed
              ? accent === WINNER_COLOR
                ? "#000"
                : "#fff"
              : "rgba(255,255,255,0.25)",
          transition: "all 0.45s ease",
        }}
      >
        {index + 1}
      </span>

      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: revealed ? "#fff" : "rgba(255,255,255,0.15)",
          filter: revealed ? "none" : "blur(7px)",
          transition: "all 0.45s ease",
        }}
      >
        {name}
      </span>

      {revealed && <span style={{ marginLeft: "auto", fontSize: 13 }}>{emoji}</span>}
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 290,
        background: "rgba(15,23,42,0.97)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        overflowY: "auto",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: WINNER_COLOR,
            textTransform: "uppercase",
          }}
        >
          Winners ({revealedWinners.length}/{winners.length})
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {winners.map((name, i) => (
            <Row
              key={name}
              name={name}
              index={i}
              revealed={revealedWinners.includes(name)}
              accent={WINNER_COLOR}
              emoji="🏆"
            />
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: WAITING_COLOR,
            textTransform: "uppercase",
          }}
        >
          Waiting List ({revealedWaiting.length}/{waitingList.length})
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {waitingList.map((name, i) => (
            <Row
              key={name}
              name={name}
              index={i}
              revealed={revealedWaiting.includes(name)}
              accent={WAITING_COLOR}
              emoji="🔖"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function RunDraw() {
  // Phases:
  // "loading" | "spinning_winners" | "spinning_waiting" | "done"
  const [phase, setPhase] = useState("loading");
  const [error, setError] = useState(null);
  const [drawData, setDrawData] = useState(null);
  const [pool, setPool] = useState([]);
  const [revealedWinners, setRevealedWinners] = useState([]);
  const [revealedWaiting, setRevealedWaiting] = useState([]);
  const [currentPick, setCurrentPick] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  const navigate = useNavigate();
  const { sessionId } = useParams();

  const renderWheel = useCallback(
    (hl = null) => {
      if (canvasRef.current) drawWheel(canvasRef.current, pool, angleRef.current, hl);
    },
    [pool]
  );

  useEffect(() => {
    renderWheel();
  }, [renderWheel]);

  // ── Auto launch on mount ──────────────────────────────────────────────────
  useEffect(() => {
    const autoLaunch = async () => {
      setError(null);
      setPhase("loading");

      try {
        const data = await fetchDrawResults(sessionId);
        setDrawData(data);
        setPool([...data.participants]);
        setRevealedWinners([]);
        setRevealedWaiting([]);
        setCurrentPick(null);
        angleRef.current = 0;
        setPhase("spinning_winners");
      } catch {
        setError("Could not execute draw. Please try again.");
      }
    };

    autoLaunch();

    return () => cancelAnimationFrame(rafRef.current);
  }, [sessionId]);

  // ── Auto spin each reveal step ────────────────────────────────────────────
  useEffect(() => {
    if (!drawData || spinning) return;

    const isWinnersPhase = phase === "spinning_winners";
    const isWaitingPhase = phase === "spinning_waiting";

    if (!isWinnersPhase && !isWaitingPhase) return;

    const nextName = isWinnersPhase
      ? drawData.winners.find((n) => !revealedWinners.includes(n))
      : drawData.waitingList.find((n) => !revealedWaiting.includes(n));

    if (!nextName) return;

    const startSpin = () => {
      const idx = pool.indexOf(nextName);
      if (idx === -1) return;

      setSpinning(true);
      setCurrentPick(null);

      const n = pool.length;
      const slice = (2 * Math.PI) / n;
      const fullRots = (8 + Math.floor(Math.random() * 5)) * 2 * Math.PI;
      const target = fullRots - idx * slice - slice / 2;
      const startAngle = angleRef.current;
      const duration = 3600 + Math.random() * 1200;
      const t0 = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 4);

      const animate = (now) => {
        const t = Math.min((now - t0) / duration, 1);
        angleRef.current = startAngle + target * easeOut(t);

        if (canvasRef.current) {
          drawWheel(canvasRef.current, pool, angleRef.current, t === 1 ? idx : null);
        }

        if (t < 1) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        setCurrentPick(nextName);
        setSpinning(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);

        const newPool = pool.filter((n) => n !== nextName);
        setPool(newPool);

        if (isWinnersPhase) {
          const updated = [...revealedWinners, nextName];
          setRevealedWinners(updated);

          if (updated.length >= drawData.winners.length) {
            setTimeout(() => {
              setCurrentPick(null);
              setPhase("spinning_waiting");
            }, 1800);
          }
        } else {
          const updated = [...revealedWaiting, nextName];
          setRevealedWaiting(updated);

          if (updated.length >= drawData.waitingList.length) {
            setTimeout(() => {
              setCurrentPick(null);
              setPhase("done");
            }, 1800);
          }
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const starter = setTimeout(startSpin, 700);
    return () => clearTimeout(starter);
  }, [drawData, phase, pool, revealedWinners, revealedWaiting, spinning]);

  const resetAndClose = () => {
    cancelAnimationFrame(rafRef.current);
    navigate("/dashboard/admin/draw");
  };

  const isWinnersPhase = phase === "spinning_winners";
  const isDone = phase === "done";
  const phaseAccent = isWinnersPhase ? WINNER_COLOR : WAITING_COLOR;

  // ── Loading / Error ───────────────────────────────────────────────────────
  if (phase === "loading" || error) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#080f1e",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          color: "#fff",
        }}
      >
        {!error ? (
          <>
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: "50%",
                border: "8px solid rgba(255,255,255,0.12)",
                borderTopColor: "#ED8D31",
                animation: "spinLoader 1s linear infinite",
              }}
            />
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>
              Executing Draw Algorithm
            </h2>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 14 }}>
              Processing session {sessionId} and fetching draw results...
            </p>
          </>
        ) : (
          <>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>
              Draw Execution Failed
            </h2>
            <p style={{ margin: 0, color: "#fca5a5", fontSize: 14 }}>{error}</p>
            <button
              onClick={resetAndClose}
              style={{
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 600,
                background: "#ED8D31",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </>
        )}

        <style>{`
          @keyframes spinLoader {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ── Fullscreen wheel ─────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#080f1e",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <Confetti active={showConfetti} />

      {drawData && (
        <ResultsPanel
          winners={drawData.winners}
          waitingList={drawData.waitingList}
          revealedWinners={revealedWinners}
          revealedWaiting={revealedWaiting}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          paddingRight: 290,
        }}
      >
        {!isDone && (
          <div
            style={{
              padding: "5px 18px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: `${phaseAccent}22`,
              color: phaseAccent,
              border: `1px solid ${phaseAccent}44`,
            }}
          >
            {isWinnersPhase ? "Winners Draw" : "Waiting List Draw"}
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginBottom: -6,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            {drawData?.activity}
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            {drawData?.session}
          </p>
        </div>

        {!isDone && (
          <div
            style={{
              position: "relative",
              width: "min(56vw,56vh)",
              height: "min(56vw,56vh)",
            }}
          >
            <canvas
              ref={canvasRef}
              width={700}
              height={700}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                right: -22,
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "16px solid transparent",
                borderBottom: "16px solid transparent",
                borderLeft: `34px solid ${phaseAccent}`,
                filter: `drop-shadow(0 0 10px ${phaseAccent}99)`,
              }}
            />
          </div>
        )}

        {currentPick && !isDone && (
          <div
            style={{
              textAlign: "center",
              animation: "popIn 0.4s cubic-bezier(.36,1.6,.5,1) both",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 11,
                color: "#64748b",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {isWinnersPhase ? "Winner!" : "Waiting List"}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 34,
                fontWeight: 800,
                color: phaseAccent,
              }}
            >
              {isWinnersPhase ? "🏆" : "🔖"} {currentPick}
            </p>
          </div>
        )}

        {!isDone && (
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            {spinning
              ? "Wheel is spinning..."
              : isWinnersPhase
              ? "Revealing winners..."
              : "Revealing waiting list..."}
          </p>
        )}

        {isDone && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 52, margin: "0 0 10px" }}>🎉</p>
            <h2
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: 800,
                margin: "0 0 8px",
              }}
            >
              Draw Complete!
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                margin: "0 0 32px",
              }}
            >
              {drawData.winners.length} winners and {drawData.waitingList.length} waiting list entries generated.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={resetAndClose}
                style={{
                  padding: "12px 32px",
                  fontSize: 14,
                  fontWeight: 600,
                  background: "#ED8D31",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Back to Launch Draw
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={resetAndClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          fontSize: 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}