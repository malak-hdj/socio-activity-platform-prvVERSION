import { Link, useParams } from "react-router-dom";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

export default function SessionDetails() {
  const { id, sessionId } = useParams();

  return (
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
              <Link
                to={`/dashboard/admin/activities/${id}/sessions`}
                className="text-[#ED8D31] font-medium"
              >
                Sessions
              </Link>
              <span className="mx-2">›</span>
              <span className="text-[#2F343B] font-medium">
                Session {sessionId}
              </span>
            </div>

            <div>
              <h1 className="text-[36px] font-extrabold text-[#2F343B]">
                Session Details
              </h1>
              <p className="text-[#7A8088] text-sm mt-2">
                Review the full information for this session.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <InfoCard label="Session Name" value={`Session ${sessionId}`} />
              <InfoCard label="Status" value="Open" />
              <InfoCard label="Start Date" value="Oct 15, 2024" />
              <InfoCard label="End Date" value="Oct 30, 2024" />
              <InfoCard label="Draw Date" value="Oct 10, 2024" />
              <InfoCard label="Draw Location" value="Oran Regional Office" />
              <InfoCard label="Assigned Sites" value="4 sites" />
              <InfoCard label="Total Quota" value="180 places" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[20px] bg-white border border-[#E5E2DC] p-5">
      <p className="text-sm font-semibold text-[#7A8088]">{label}</p>
      <p className="text-lg font-bold text-[#2F343B] mt-2">{value}</p>
    </div>
  );
}