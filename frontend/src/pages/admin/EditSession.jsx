import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

export default function EditSession() {
  const { id, sessionId } = useParams();

  const [form, setForm] = useState({
    name: `Session ${sessionId}`,
    startDate: "2024-10-15",
    endDate: "2024-10-30",
    drawDate: "2024-10-10",
    drawLocation: "Oran Regional Office",
    status: "Open",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert(`Session ${sessionId} updated`);
  };

  return (
    <div className="flex h-screen bg-[#F7F7F5]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="text-sm text-[#7A8088]">
              <Link
                to={`/dashboard/admin/activities/${id}/sessions`}
                className="text-[#ED8D31] font-medium"
              >
                Sessions
              </Link>
              <span className="mx-2">›</span>
              <span className="text-[#2F343B] font-medium">Edit Session</span>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-[36px] font-extrabold text-[#2F343B]">
                  Edit Session
                </h1>
                <p className="text-[#7A8088] text-sm mt-2">
                  Update dates, draw settings, and session status.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/dashboard/admin/activities/${id}/sessions`}
                  className="px-5 py-3 rounded-[14px] border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-semibold"
                >
                  Cancel
                </Link>

                <button
                  onClick={handleSave}
                  className="px-5 py-3 rounded-[14px] bg-[#ED8D31] text-white text-sm font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="rounded-[24px] bg-white border border-[#E5E2DC] p-5 space-y-5">
              <Field label="Session Name">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Start Date">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                  />
                </Field>

                <Field label="End Date">
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                  />
                </Field>

                <Field label="Draw Date">
                  <input
                    type="date"
                    value={form.drawDate}
                    onChange={(e) => handleChange("drawDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                  />
                </Field>

                <Field label="Draw Location">
                  <input
                    type="text"
                    value={form.drawLocation}
                    onChange={(e) => handleChange("drawLocation", e.target.value)}
                    className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                  />
                </Field>
              </div>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] text-sm outline-none"
                >
                  <option>Draft</option>
                  <option>Open</option>
                  <option>Closed</option>
                </select>
              </Field>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#2F343B] mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}