import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

const initialNotifications = [
  {
    id: 1,
    title: "Draw results are now available",
    message:
      "The draw results for Omra - Winter Session 2024 have been published.",
    type: "Draw Result",
    date: "Today · 09:30",
    read: false,
  },
  {
    id: 2,
    title: "Confirm your participation",
    message:
      "You have been selected for Camping - Autumn Session. Please confirm your participation.",
    type: "Confirmation",
    date: "Yesterday · 14:10",
    read: false,
  },
  {
    id: 3,
    title: "Missing documents reminder",
    message:
      "Please upload the required documents before the document deadline.",
    type: "Documents",
    date: "Oct 18, 2024",
    read: true,
  },
  {
    id: 4,
    title: "New winter activities are open",
    message:
      "New winter activities are now available in the catalog.",
    type: "Activity",
    date: "Oct 15, 2024",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <div className="flex h-screen bg-[#F7F7F5]">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[980px] space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[36px] font-extrabold text-[#2F343B] leading-[110%]">
                  Notifications
                </h1>
                <p className="text-[#7A8088] text-sm mt-2">
                  You have {unreadCount} unread notification(s).
                </p>
              </div>

              <button
                onClick={markAllAsRead}
                className="px-4 py-2.5 rounded-[12px] bg-[#ED8D31] text-white text-sm font-semibold"
              >
                Mark all as read
              </button>
            </div>

            <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E5E2DC] flex items-center justify-between">
                <h2 className="text-[22px] font-bold text-[#2F343B]">
                  Notification list
                </h2>

                <span className="text-xs font-semibold text-[#7A8088]">
                  {notifications.length} total
                </span>
              </div>

              <div className="divide-y divide-[#E5E2DC]">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`w-full text-left px-5 py-4 flex gap-4 hover:bg-[#FBFAF8] transition-colors ${
                      item.read ? "bg-white" : "bg-[#FFF9F2]"
                    }`}
                  >
                    <div
                      className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        item.read ? "bg-[#D8D5CF]" : "bg-[#ED8D31]"
                      }`}
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-bold text-[#2F343B]">
                          {item.title}
                        </p>

                        <span className="text-xs text-[#7A8088] whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>

                      <p className="text-sm text-[#7A8088] mt-1 leading-[160%]">
                        {item.message}
                      </p>

                      <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-[#F1F0EC] text-[#7A8088] text-xs font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </button>
                ))}

                {notifications.length === 0 && (
                  <div className="p-8 text-center text-sm text-[#7A8088]">
                    No notifications available.
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}