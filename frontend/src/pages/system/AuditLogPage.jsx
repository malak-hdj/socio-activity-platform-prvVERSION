import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

const logsData = [
  {
    id: 1,
    date: "Oct 20, 2024 · 10:32",
    user: "Admin A",
    role: "System Admin",
    action: "Assigned Role",
    target: "Ahmed K.",
    details: "Functional Admin",
  },
  {
    id: 2,
    date: "Oct 20, 2024 · 10:35",
    user: "Admin A",
    role: "System Admin",
    action: "Removed Role",
    target: "Nadia M.",
    details: "Communicator",
  },
  {
    id: 3,
    date: "Oct 20, 2024 · 11:00",
    user: "Admin B",
    role: "Functional Admin",
    action: "Created Activity",
    target: "Camping 2025",
    details: "-",
  },
  {
    id: 4,
    date: "Oct 20, 2024 · 11:45",
    user: "Communicator C",
    role: "Communicator",
    action: "Published Announcement",
    target: "Winter Activities",
    details: "-",
  },
];

export default function AuditLogPage() {
  const [search, setSearch] = useState("");

  const filteredLogs = logsData.filter((log) => {
    const q = search.toLowerCase();
    return (
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.target.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex h-screen bg-[#F7F7F5]">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm font-semibold text-[#ED8D31] mb-2">
                System admin tools
              </p>

              <h1 className="text-[36px] font-extrabold text-[#2F343B]">
                Audit Log
              </h1>

              <p className="text-[#7A8088] text-sm mt-2 max-w-[700px]">
                Track system activity including role assignments, actions,
                and administrative operations.
              </p>
            </div>

            {/* Search */}
            <div className="rounded-[20px] bg-white border border-[#E5E2DC] p-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by user, action, or target..."
                className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
              />
            </div>

            {/* Table */}
            <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E5E2DC] flex justify-between items-center">
                <h2 className="text-[22px] font-bold text-[#2F343B]">
                  Activity History
                </h2>

                <span className="text-xs text-[#7A8088] font-semibold">
                  {filteredLogs.length} records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-[#FBFAF8]">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">Date</th>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">User</th>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">Role</th>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">Action</th>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">Target</th>
                      <th className="px-5 py-4 text-left text-xs text-[#7A8088] uppercase">Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-t border-[#E5E2DC]">
                        <td className="px-5 py-4 text-sm text-[#7A8088]">{log.date}</td>
                        <td className="px-5 py-4 text-sm text-[#2F343B] font-medium">{log.user}</td>
                        <td className="px-5 py-4 text-sm text-[#7A8088]">{log.role}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#ED8D31]">{log.action}</td>
                        <td className="px-5 py-4 text-sm text-[#7A8088]">{log.target}</td>
                        <td className="px-5 py-4 text-sm text-[#7A8088]">{log.details}</td>
                      </tr>
                    ))}

                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-sm text-[#7A8088]">
                          No records found.
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
  );
}