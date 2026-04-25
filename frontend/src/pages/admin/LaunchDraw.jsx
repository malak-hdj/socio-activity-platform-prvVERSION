import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";
import { useNavigate } from "react-router-dom";

const initialReadySessions = [
  {
    id: 1,
    activity: "Excursion à Djanet",
    session: "Session Autumn 2024",
    registrationDeadline: "Sep 20, 2024",
    drawDate: "Sep 22, 2024",
    drawLocation: "Algiers HQ",
    applicants: 142,
    eligible: 128,
    totalQuota: 50,
    sitesConfigured: 3,
    status: "Ready",
  },
  {
    id: 2,
    activity: "Omra",
    session: "Winter Session 2024",
    registrationDeadline: "Sep 25, 2024",
    drawDate: "Sep 27, 2024",
    drawLocation: "Oran Regional Office",
    applicants: 310,
    eligible: 284,
    totalQuota: 120,
    sitesConfigured: 4,
    status: "Ready",
  },
  {
    id: 3,
    activity: "Thermal stay - Hammam Righa",
    session: "Main Session",
    registrationDeadline: "Sep 16, 2024",
    drawDate: "Sep 18, 2024",
    drawLocation: "Skikda Office",
    applicants: 86,
    eligible: 79,
    totalQuota: 30,
    sitesConfigured: 2,
    status: "Ready",
  },
];

const initialNotReadySessions = [
  {
    id: 101,
    activity: "Vacances nature & détente",
    session: "Family Session A",
    registrationDeadline: "Oct 05, 2024",
    drawDate: "Oct 08, 2024",
    drawLocation: "Algiers HQ",
    applicants: 74,
    eligible: 68,
    totalQuota: 60,
    sitesConfigured: 0,
    status: "Not Ready",
    blockingReason: "Sites and quotas are not configured yet.",
  },
  {
    id: 102,
    activity: "Corporate Retreat",
    session: "Main Session",
    registrationDeadline: "Oct 10, 2024",
    drawDate: "Oct 12, 2024",
    drawLocation: "Oran Regional Office",
    applicants: 42,
    eligible: 0,
    totalQuota: 40,
    sitesConfigured: 3,
    status: "Not Ready",
    blockingReason: "No eligible applicants available for draw.",
  },
  {
    id: 103,
    activity: "Summer Camp",
    session: "Kids Session 2",
    registrationDeadline: "Oct 18, 2024",
    drawDate: "Oct 20, 2024",
    drawLocation: "Hassi Messaoud",
    applicants: 19,
    eligible: 19,
    totalQuota: 25,
    sitesConfigured: 2,
    status: "Not Ready",
    blockingReason: "Registration deadline has not passed yet.",
  },
];

export default function LaunchDraw() {
  const [readySessions, setReadySessions] = useState(initialReadySessions);
  const [notReadySessions] = useState(initialNotReadySessions);

  const [modal, setModal] = useState({
    open: false,
    type: null, // details | confirmLaunch | running | success
    sessionId: null,
    bucket: null, // ready | notReady
  });

  const [runningSession, setRunningSession] = useState(null);

  const selectedSession =
    (modal.bucket === "ready"
      ? readySessions.find((item) => item.id === modal.sessionId)
      : notReadySessions.find((item) => item.id === modal.sessionId)) || null;

  const stats = useMemo(() => {
    return {
      totalRequiringDraw: readySessions.length + notReadySessions.length,
      ready: readySessions.length,
      notReady: notReadySessions.length,
      totalEligible: readySessions.reduce((sum, item) => sum + item.eligible, 0),
    };
  }, [readySessions, notReadySessions]);

  const closeModal = () => {
    setModal({
      open: false,
      type: null,
      sessionId: null,
      bucket: null,
    });
  };

  const openDetails = (sessionId, bucket) => {
    setModal({
      open: true,
      type: "details",
      sessionId,
      bucket,
    });
  };

  const navigate = useNavigate();

  const openLaunchConfirm = (sessionId) => {
    setModal({
      open: true,
      type: "confirmLaunch",
      sessionId,
      bucket: "ready",
    });
  };

  const handleLaunchDraw = () => {
    const currentSession = readySessions.find(
      (item) => item.id === modal.sessionId
    );

    if (!currentSession) return;

    setRunningSession(currentSession);

    setModal({
      open: true,
      type: "running",
      sessionId: currentSession.id,
      bucket: "ready",
    });
  };

  useEffect(() => {
    if (modal.open && modal.type === "running" && runningSession) {
      const timer = setTimeout(() => {
        setReadySessions((prev) =>
          prev.filter((item) => item.id !== runningSession.id)
        );

        setModal({
          open: true,
          type: "success",
          sessionId: runningSession.id,
          bucket: "ready",
        });
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [modal, runningSession]);

  return (
    <>
      <div className="flex h-screen bg-[#F7F7F5]">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardTopBar />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <p className="text-sm font-semibold text-[#ED8D31] mb-2">
                  Admin tools
                </p>
                <h1 className="text-[38px] font-extrabold text-[#2F343B] leading-[110%]">
                  Launch Draw
                </h1>
                <p className="text-[#7A8088] text-sm mt-2 leading-[170%] max-w-[850px]">
                  Review all sessions that require a draw, verify which ones are
                  ready for execution, inspect draw context, and launch the draw
                  algorithm for eligible sessions.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                  title="Sessions Requiring Draw"
                  value={stats.totalRequiringDraw}
                  subtitle="All sessions with draw logic enabled"
                />
                <StatCard
                  title="Ready for Draw"
                  value={stats.ready}
                  subtitle="Sessions ready to launch now"
                />
                <StatCard
                  title="Not Ready"
                  value={stats.notReady}
                  subtitle="Sessions blocked by missing prerequisites"
                />
                <StatCard
                  title="Eligible Applicants"
                  value={stats.totalEligible}
                  subtitle="Across all ready sessions"
                />
              </div>

              {/* Ready sessions */}
              <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E5E2DC]">
                  <h2 className="text-[28px] font-bold text-[#2F343B]">
                    Ready Sessions for Draw
                  </h2>
                  <p className="text-sm text-[#7A8088] mt-1">
                    These sessions meet all requirements and can launch the draw algorithm now.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1180px]">
                    <thead className="bg-[#FBFAF8]">
                      <tr>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Activity
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Session
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Draw Date
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Applicants
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Eligible
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Quota
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Status
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {readySessions.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[#E5E2DC] align-top"
                        >
                          <td className="px-5 py-5">
                            <p className="font-semibold text-[#2F343B] text-sm">
                              {item.activity}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm text-[#7A8088]">
                            {item.session}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#7A8088]">
                            {item.drawDate}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.applicants}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.eligible}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.totalQuota}
                          </td>

                          <td className="px-5 py-5">
                            <StatusBadge status={item.status} />
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => openDetails(item.id, "ready")}
                                className="px-3 py-1.5 rounded-lg border border-[#E5E2DC] text-sm bg-white"
                              >
                                View Details
                              </button>

                              <button
  onClick={() => navigate(`/dashboard/admin/draw/run/${item.id}`)}
>
  Launch Draw
</button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {readySessions.length === 0 && (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-5 py-10 text-center text-sm text-[#7A8088]"
                          >
                            No sessions are currently ready for draw.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Not ready sessions */}
              <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E5E2DC]">
                  <h2 className="text-[28px] font-bold text-[#2F343B]">
                    Not Ready Sessions
                  </h2>
                  <p className="text-sm text-[#7A8088] mt-1">
                    These sessions are blocked and need additional configuration or validation before launching.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1220px]">
                    <thead className="bg-[#FBFAF8]">
                      <tr>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Activity
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Session
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Draw Date
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Applicants
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Eligible
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Quota
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Blocking Reason
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {notReadySessions.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[#E5E2DC] align-top"
                        >
                          <td className="px-5 py-5">
                            <p className="font-semibold text-[#2F343B] text-sm">
                              {item.activity}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm text-[#7A8088]">
                            {item.session}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#7A8088]">
                            {item.drawDate}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.applicants}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.eligible}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#2F343B] font-medium">
                            {item.totalQuota}
                          </td>

                          <td className="px-5 py-5 text-sm text-[#C06A00] max-w-[280px]">
                            {item.blockingReason}
                          </td>

                          <td className="px-5 py-5">
                            <button
                              onClick={() => openDetails(item.id, "notReady")}
                              className="px-3 py-1.5 rounded-lg border border-[#E5E2DC] text-sm bg-white"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}

                      {notReadySessions.length === 0 && (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-5 py-10 text-center text-sm text-[#7A8088]"
                          >
                            All sessions are currently ready for draw.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Details modal */}
      {modal.open && modal.type === "details" && selectedSession && (
        <ModalShell title="Draw Session Details" onClose={closeModal}>
          <DetailRow label="Activity" value={selectedSession.activity} />
          <DetailRow label="Session" value={selectedSession.session} />
          <DetailRow
            label="Registration Deadline"
            value={selectedSession.registrationDeadline}
          />
          <DetailRow label="Draw Date" value={selectedSession.drawDate} />
          <DetailRow label="Draw Location" value={selectedSession.drawLocation} />
          <DetailRow label="Applicants" value={String(selectedSession.applicants)} />
          <DetailRow label="Eligible" value={String(selectedSession.eligible)} />
          <DetailRow label="Total Quota" value={String(selectedSession.totalQuota)} />
          <DetailRow
            label="Sites Configured"
            value={String(selectedSession.sitesConfigured)}
          />
          <DetailRow label="Status" value={selectedSession.status} />

          {selectedSession.blockingReason && (
            <div className="rounded-[14px] bg-[#FFF4D6] px-4 py-3">
              <p className="text-sm font-semibold text-[#8A5A00] mb-2">
                Blocking Reason
              </p>
              <p className="text-sm text-[#8A5A00] leading-[170%]">
                {selectedSession.blockingReason}
              </p>
            </div>
          )}
        </ModalShell>
      )}

      {/* Confirm launch modal */}
      {modal.open && modal.type === "confirmLaunch" && selectedSession && (
        <ConfirmModal
          title="Launch Draw"
          message={`Do you want to execute the draw for ${selectedSession.activity} — ${selectedSession.session}? This will run the draw algorithm using the configured quotas and eligible applicants.`}
          confirmLabel="Launch Draw"
          onCancel={closeModal}
          onConfirm={handleLaunchDraw}
        />
      )}

      {/* Running animation modal */}
      {modal.open && modal.type === "running" && runningSession && (
        <RunningDrawModal
          activity={runningSession.activity}
          session={runningSession.session}
        />
      )}

      {/* Success modal */}
      {modal.open && modal.type === "success" && runningSession && (
        <ModalShell title="Draw Completed" onClose={closeModal}>
          <DetailRow label="Activity" value={runningSession.activity} />
          <DetailRow label="Session" value={runningSession.session} />
          <DetailRow label="Eligible Applicants" value={String(runningSession.eligible)} />
          <DetailRow label="Total Quota" value={String(runningSession.totalQuota)} />

          <div className="rounded-[14px] bg-[#D4F4DD] px-4 py-3">
            <p className="text-sm font-semibold text-[#2D7A4A] mb-2">
              Execution Successful
            </p>
            <p className="text-sm text-[#2D7A4A] leading-[170%]">
              The draw algorithm has been executed successfully. Selected applicants
              and waiting list results are now available in the dedicated results page.
            </p>
          </div>
        </ModalShell>
      )}
    </>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[20px] bg-white border border-[#E5E2DC] p-5">
      <p className="text-sm font-semibold text-[#7A8088]">{title}</p>
      <p className="text-3xl font-extrabold text-[#2F343B] mt-2">{value}</p>
      <p className="text-xs text-[#7A8088] mt-2">{subtitle}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Ready: "bg-[#D4F4DD] text-[#2D7A4A]",
    "Not Ready": "bg-[#FFF4D6] text-[#B98900]",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function ModalShell({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[20px] p-6 w-full max-w-[560px] shadow-lg">
        <h2 className="text-xl font-bold text-[#2F343B] mb-4">{title}</h2>
        <div className="space-y-3 mb-6">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[12px] border border-[#E5E2DC]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[20px] p-6 w-full max-w-[460px] shadow-lg">
        <h2 className="text-xl font-bold text-[#2F343B] mb-3">{title}</h2>
        <p className="text-sm text-[#7A8088] mb-6 leading-[170%]">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-[12px] border border-[#E5E2DC] text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-[12px] bg-[#ED8D31] text-white text-sm font-medium"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function RunningDrawModal({ activity, session }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[20px] p-8 w-full max-w-[460px] shadow-lg text-center">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full border-4 border-[#F3D3B1] border-t-[#ED8D31] animate-spin" />
        </div>

        <h2 className="text-xl font-bold text-[#2F343B] mb-3">
          Executing Draw Algorithm
        </h2>
        <p className="text-sm text-[#7A8088] leading-[170%]">
          Processing <span className="font-semibold text-[#2F343B]">{activity}</span> —{" "}
          <span className="font-semibold text-[#2F343B]">{session}</span>.
          Please wait while the system generates the selected list and waiting list.
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between rounded-[14px] bg-[#F9F8F6] px-4 py-3 gap-4">
      <span className="text-sm text-[#7A8088]">{label}</span>
      <span className="text-sm font-semibold text-[#2F343B] text-right">
        {value}
      </span>
    </div>
  );
}