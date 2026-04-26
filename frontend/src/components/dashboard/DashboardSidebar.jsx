import { Link, useLocation, useNavigate } from "react-router-dom";

const employeeItems = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "Activities Catalog", path: "/dashboard/catalog", icon: "🏕" },
  { label: "My Requests", path: "/dashboard/requests", icon: "📄", badge: "3" },
  { label: "Draw Results", path: "/dashboard/draw", icon: "🎯" },
  { label: "Documents", path: "/dashboard/documents", icon: "📁" },
  { label: "Participation History", path: "/dashboard/history", icon: "🕒" },
  { label: "Surveys", path: "/dashboard/surveys", icon: "📋" },
  { label: "Idea Box", path: "/dashboard/ideas", icon: "💡" },
];

const adminItems = [
  { label: "Manage Activities", path: "/dashboard/admin/activities", icon: "⚙️" },
  { label: "Manage Documents", path: "/dashboard/admin/documents", icon: "📋" },
  { label: "Manage Site", path: "/dashboard/admin/site", icon: "🏢" },
  { label: "Manage Registrations", path: "/dashboard/admin/registrations", icon: "📝" },
  { label: "Launch Draw", path: "/dashboard/admin/draw", icon: "🎯" },
  { label: "Withdrawals", path: "/dashboard/admin/withdrawals", icon: "↩️", badge: "4" },
  { label: "Reports", path: "/dashboard/admin/reports", icon: "📊" },
  { label: "Draw History", path: "/dashboard/admin/draw-history", icon: "🕘" },
];

const communicatorItems = [
  { label: "Manage Announcements", path: "/dashboard/communicator/announcements", icon: "📢" },
  { label: "Manage Surveys", path: "/dashboard/communicator/surveys", icon: "📝" },
  { label: "Idea Box Moderation", path: "/dashboard/communicator/ideas", icon: "💡" },
  { label: "Manage Notifications", path: "/dashboard/communicator/notifications", icon: "🔔" },
];

const systemAdminItems = [
  { label: "Manage Functional Admins", path: "/dashboard/system/functional-admins", icon: "🛡️" },
  { label: "Manage Communicators", path: "/dashboard/system/communicators", icon: "📢" },
  { label: "Manage System Admins", path: "/dashboard/system/system-admins", icon: "👑" },
  { label: "Audit Log", path: "/dashboard/system/audit-log", icon: "📜" },
];

function NavSection({ title, items, location }) {
  return (
    <div className="mb-4">
      <p className="px-4 mb-2 text-xs font-semibold text-[#7A8088]">
        {title}
      </p>

      {items.map((item) => {
        const isActive =
          item.path === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-1 ${
              isActive
                ? "bg-[#ED8D31] text-white"
                : "text-[#2F343B] hover:bg-[#F5F4F1]"
            }`}
          >
            <span className="w-5 text-center">{item.icon}</span>
            <span className="flex-1 text-[13px]">{item.label}</span>

            {item.badge && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white text-[#ED8D31]"
                    : "bg-[#ED8D31] text-white"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const roles = (user?.roles || []).map((role) => {
    if (typeof role === "string") return role;
    return role.name || role.role || role.label;
  });

  const isSystemAdmin = roles.includes("SYSTEM_ADMIN");
  const isFunctionalAdmin = roles.includes("FUNCTIONAL_ADMIN");
  const isCommunicator = roles.includes("COMMUNICATOR");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-white border-r border-[#E5E2DC] flex flex-col sticky top-0">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#E5E2DC]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/af72391ae8971f15efed2311d265b92f2f3a69fd?width=84"
          alt="Sonatrach"
          className="w-9 h-9 rounded-[10px] object-cover"
        />
        <span className="font-bold text-[#2F343B] text-sm tracking-tight">
          SONATRACH
        </span>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <NavSection
          title="Employee space"
          items={employeeItems}
          location={location}
        />

        {(isFunctionalAdmin || isSystemAdmin) && (
          <>
            <div className="my-3 border-t border-[#E5E2DC]" />
            <NavSection title="Admin tools" items={adminItems} location={location} />
          </>
        )}

        {(isCommunicator || isSystemAdmin) && (
          <>
            <div className="my-3 border-t border-[#E5E2DC]" />
            <NavSection
              title="Communicator tools"
              items={communicatorItems}
              location={location}
            />
          </>
        )}

        {isSystemAdmin && (
          <>
            <div className="my-3 border-t border-[#E5E2DC]" />
            <NavSection
              title="System Admin tools"
              items={systemAdminItems}
              location={location}
            />
          </>
        )}
      </nav>

      <div className="p-3 border-t border-[#E5E2DC]">
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-[12px] bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d97d26] transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}