import { useState } from "react";

export default function DashboardRightPanel() {
  const [ideaForm, setIdeaForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    console.log("Idea submitted:", ideaForm);
    setIdeaForm({ title: "", description: "" });
  };

  return (
    <aside className="w-[300px] min-w-[300px] bg-white border-l border-[#E5E2DC] p-5 overflow-y-auto space-y-6">
      {/* Draw Results */}
      <div className="rounded-[20px] bg-gradient-to-br from-[#F5F4F1] to-white border border-[#E5E2DC] p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-[#E5E2DC]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"
                stroke="#3FA56B"
                strokeWidth="1.2"
              />
              <path
                d="M5 8l2 2 4-4"
                stroke="#3FA56B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-bold text-[#2F343B] text-sm">Draw Result</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#D4F4DD] p-4 mb-4">
          <p className="text-xs font-semibold text-[#2D7A4A] mb-2">
            Congratulations!
          </p>
          <p className="text-xs text-[#7A8088] leading-relaxed">
            You have been selected for the Summer Camp activity. Please finalize
            your required documents.
          </p>
        </div>

        <button className="w-full px-4 py-2.5 rounded-lg bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d97d26] transition-colors">
          View result details
        </button>
      </div>

      {/* Documents to Provide */}
      <div>
        <h3 className="font-bold text-[#2F343B] text-sm mb-4">
          Documents to provide
        </h3>

        <div className="space-y-3">
          {[
            {
              icon: "📋",
              title: "Medical Certificate",
              desc: "Required for Summer Camp",
            },
            {
              icon: "📄",
              title: "Family Booklet Copy",
              desc: "Needed before Oct 05, 2024",
            },
          ].map((doc, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-3 rounded-lg bg-[#F5F4F1] border border-[#E5E2DC]"
            >
              <div className="flex gap-2 flex-1">
                <span className="text-lg flex-shrink-0">{doc.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#2F343B]">
                    {doc.title}
                  </p>
                  <p className="text-xs text-[#7A8088]">{doc.desc}</p>
                </div>
              </div>

              <button className="text-xs font-semibold text-[#ED8D31] hover:opacity-80 transition-opacity flex-shrink-0">
                Upload
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Surveys */}
      <div>
        <h3 className="font-bold text-[#2F343B] text-sm mb-4">
          Active surveys
        </h3>

        <div className="rounded-lg border border-[#E5E2DC] p-3 bg-white hover:shadow-sm transition-shadow">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#ED8D31] flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-white font-bold">⏱</span>
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold text-[#2F343B]">
                Q3 Activities Satisfaction
              </p>
              <p className="text-xs text-[#7A8088] mt-0.5">Takes ~2 mins</p>
            </div>
          </div>

          <button className="w-full text-xs font-semibold text-[#ED8D31] hover:opacity-80 transition-opacity mt-2">
            Participate
          </button>
        </div>
      </div>

      {/* Idea Box */}
      <div className="rounded-[20px] bg-gradient-to-b from-[#ED8D31] to-[#d97d26] text-white p-5">
        <div className="flex items-start gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip_idea_panel)">
              <path
                d="M11.25 10.5C11.4 9.75 11.775 9.225 12.375 8.625C13.125 7.95 13.5 6.975 13.5 6C13.5 3.516 11.484 1.5 9 1.5C6.516 1.5 4.5 3.516 4.5 6C4.5 6.75 4.65 7.65 5.625 8.625C6.15 9.15 6.6 9.75 6.75 10.5M6.75 13.5H11.25M7.5 16.5H10.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip_idea_panel">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div>
            <h3 className="font-bold text-sm">Have an idea?</h3>
          </div>
        </div>

        <p className="text-xs opacity-90 mb-4">
          Share your suggestions for new activities, trips, or ways to improve
          the employee experience.
        </p>

        <form onSubmit={handleSubmitIdea} className="space-y-3">
          <input
            type="text"
            value={ideaForm.title}
            onChange={(e) =>
              setIdeaForm({ ...ideaForm, title: e.target.value })
            }
            placeholder="Your idea title..."
            className="w-full px-3 py-2 rounded-lg bg-white text-[#2F343B] text-xs placeholder:text-[#7A8088] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />

          <textarea
            value={ideaForm.description}
            onChange={(e) =>
              setIdeaForm({ ...ideaForm, description: e.target.value })
            }
            placeholder="Describe your idea..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white text-[#2F343B] text-xs placeholder:text-[#7A8088] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-white text-[#ED8D31] font-semibold text-sm hover:bg-opacity-95 transition-colors"
          >
            Submit an idea
          </button>
        </form>
      </div>
    </aside>
  );
}