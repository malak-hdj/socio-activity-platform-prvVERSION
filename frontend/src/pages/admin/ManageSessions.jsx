import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";
import { Link, useParams } from "react-router-dom";

const sessions = [
  {
    id: 1,
    name: "Session 1",
    subStatus: "Completed",
    startDate: "Sep 01, 2024",
    endDate: "Sep 15, 2024",
    drawDate: "Aug 25, 2024",
    drawLocation: "Algiers HQ",
    assignedSites: 5,
    status: "Closed",
  },
  {
    id: 2,
    name: "Session 2",
    subStatus: "Registration Open",
    startDate: "Oct 15, 2024",
    endDate: "Oct 30, 2024",
    drawDate: "Oct 10, 2024",
    drawLocation: "Oran Regional Office",
    assignedSites: 4,
    status: "Open",
  },
  {
    id: 3,
    name: "Session 3",
    subStatus: "Awaiting setup",
    startDate: "Nov 01, 2024",
    endDate: "Nov 15, 2024",
    drawDate: "Oct 25, 2024",
    drawLocation: "Hassi Messaoud",
    assignedSites: 0,
    status: "Draft",
  },
];

export default function ManageSessions() {
  const { id } = useParams();

  const [modal, setModal] = useState({
    open: false,
    sessionId: null,
  });

  const closeModal = () => {
    setModal({
      open: false,
      sessionId: null,
    });
  };

  const handleDeleteSession = () => {
    alert(`Session ${modal.sessionId} deleted`);
    closeModal();
  };

  const handleLaunchDraw = (sessionId) => {
    alert(`Draw launched for session ${sessionId}`);
  };

  return (
    <>
      <div className="flex h-screen bg-[#F7F7F5]">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardTopBar />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="text-sm text-[#7A8088]">
                <Link
                  to="/dashboard/admin/activities"
                  className="text-[#ED8D31] font-medium"
                >
                  Manage Activities
                </Link>
                <span className="mx-2">›</span>
                <span className="text-[#2F343B] font-medium">
                  Activity {id}
                </span>
              </div>

              <div>
                <h1 className="text-[38px] font-extrabold text-[#2F343B] leading-[110%]">
                  Session Management
                </h1>
                <p className="text-[#7A8088] text-sm mt-2 leading-[170%]">
                  Create and manage sessions, define draw dates, and configure
                  site allocations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                  title="Total Sessions"
                  value="3"
                  subtitle={`For activity ${id}`}
                />
                <StatCard
                  title="Assigned Sites"
                  value="9"
                  subtitle="Across all active sessions"
                />
                <StatCard
                  title="Total Quota"
                  value="450"
                  subtitle="Places available in total"
                />
                <StatCard
                  title="Next Draw Date"
                  value="Oct 10, 2024"
                  subtitle="For Session 2"
                />
              </div>

              <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#E5E2DC] flex items-center justify-between">
                  <div>
                    <h2 className="text-[28px] font-bold text-[#2F343B]">
                      Sessions List
                    </h2>
                    <p className="text-sm text-[#7A8088] mt-1">
                      Manage all sessions and their assigned sites for this activity.
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/admin/activities/${id}/sessions/create`}
                    className="px-4 py-2.5 rounded-[14px] border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-semibold inline-block"
                  >
                    + Add Session
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px]">
                    <thead className="bg-[#FBFAF8]">
                      <tr>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Session
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Dates (Start - End)
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Draw Details
                        </th>
                        <th className="px-5 py-4 text-left text-xs font-semibold text-[#7A8088] uppercase">
                          Assigned Sites
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
                      {sessions.map((session) => (
                        <tr
                          key={session.id}
                          className="border-t border-[#E5E2DC] align-top"
                        >
                          <td className="px-5 py-5">
                            <p className="font-semibold text-[#2F343B] text-sm">
                              {session.name}
                            </p>
                            <p className="text-xs text-[#7A8088] mt-1">
                              {session.subStatus}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-medium text-[#2F343B]">
                              {session.startDate}
                            </p>
                            <p className="text-xs text-[#7A8088] mt-1">
                              {session.endDate}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-medium text-[#2F343B]">
                              {session.drawDate}
                            </p>
                            <p className="text-xs text-[#7A8088] mt-1">
                              {session.drawLocation}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-medium text-[#2F343B]">
                              {session.assignedSites} sites
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <StatusBadge status={session.status} />
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex flex-wrap gap-2">
                              <Link
                                to={`/dashboard/admin/activities/${id}/sessions/${session.id}`}
                                className="w-9 h-9 rounded-lg border border-[#E5E2DC] bg-white text-[#7A8088] flex items-center justify-center"
                                title="View session"
                              >
                                👁
                              </Link>

                              <Link
                                to={`/dashboard/admin/activities/${id}/sessions/${session.id}/edit`}
                                className="w-9 h-9 rounded-lg border border-[#E5E2DC] bg-white text-[#7A8088] flex items-center justify-center"
                                title="Edit session"
                              >
                                ✎
                              </Link>

                              <button
                                onClick={() =>
                                  setModal({
                                    open: true,
                                    sessionId: session.id,
                                  })
                                }
                                className="w-9 h-9 rounded-lg border border-[#F0B1B1] bg-white text-[#D85C5C]"
                                title="Delete session"
                              >
                                🗑
                              </button>

                              <Link
  to={`/dashboard/admin/activities/${id}/sessions/${session.id}/sites-quotas`}
  className="px-4 py-2 rounded-lg border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium inline-block"
>
  Sites & Quotas
</Link>

                              <button
                                onClick={() => handleLaunchDraw(session.id)}
                                disabled={session.status !== "Open"}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  session.status === "Open"
                                    ? "bg-[#ED8D31] text-white"
                                    : "border border-[#E5E2DC] bg-[#F7F7F5] text-[#B0B5BB]"
                                }`}
                              >
                                Launch Draw
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-[400px] shadow-lg">
            <h2 className="text-xl font-bold text-[#2F343B] mb-3">
              Delete Session
            </h2>

            <p className="text-sm text-[#7A8088] mb-6">
              Are you sure you want to delete this session? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-[12px] border border-[#E5E2DC] text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteSession}
                className="px-4 py-2 rounded-[12px] bg-[#ED8D31] text-white text-sm font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
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
    Closed: "bg-[#F1F0EC] text-[#7A8088]",
    Open: "bg-[#D4F4DD] text-[#2D7A4A]",
    Draft: "bg-[#FFF4D6] text-[#B98900]",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}