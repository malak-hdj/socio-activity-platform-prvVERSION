import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import ActivityDetail from "./pages/ActivityDetail";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AnnouncementDetails from "./pages/AnnouncementDetails";

// Employee pages
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/employee/MyRequests";
import DrawResults from "./pages/employee/DrawResults";
import Documents from "./pages/employee/Documents";
import Surveys from "./pages/employee/Surveys";
import ParticipationHistory from "./pages/employee/ParticipationHistory";
import IdeaBox from "./pages/employee/IdeaBox";
import NotificationsPage from "./pages/employee/NotificationsPage";
import ActivitiesCatalog from "./pages/employee/ActivitiesCatalog";

// Admin (functional)
import ManageActivities from "./pages/admin/ManageActivities";
import CreateActivity from "./pages/admin/CreateActivity";
import ModifyActivity from "./pages/admin/ModifyActivity";
import ManageSessions from "./pages/admin/ManageSessions";
import CreateSession from "./pages/admin/CreateSession";
import SessionDetails from "./pages/admin/SessionDetails";
import EditSession from "./pages/admin/EditSession";
import SitesAndQuotas from "./pages/admin/SitesAndQuotas";
import ManageRegistrations from "./pages/admin/ManageRegistrations";
import ManageDocuments from "./pages/admin/ManageDocuments";
import LaunchDraw from "./pages/admin/LaunchDraw";
import RunDraw from "./pages/admin/RunDraw";
import ManageWithdrawals from "./pages/admin/ManageWithdrawals";
import Reports from "./pages/admin/Reports";
import DrawHistory from "./pages/admin/DrawHistory";
import ManageSite from "./pages/admin/ManageSite";

// Communicator
import ManageAnnouncements from "./pages/communicator/ManageAnnouncements";
import CreateAnnouncement from "./pages/communicator/CreateAnnouncement";
import ManageSurveys from "./pages/communicator/ManageSurveys";
import CreateSurveyNotice from "./pages/communicator/CreateSurveyNotice";
import IdeaBoxModeration from "./pages/communicator/IdeaBoxModeration";
import ManageNotifications from "./pages/communicator/ManageNotifications";

// System Admin
import ManageFunctionalAdmins from "./pages/system/ManageFunctionalAdmins";
import ManageCommunicators from "./pages/system/ManageCommunicators";
import ManageSystemAdmins from "./pages/system/ManageSystemAdmins";
import AuditLogPage from "./pages/system/AuditLogPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:slug" element={<AnnouncementDetails />} />

        {/* EMPLOYEE (ALL LOGGED USERS) */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/requests"
          element={<ProtectedRoute><MyRequests /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/draw"
          element={<ProtectedRoute><DrawResults /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/documents"
          element={<ProtectedRoute><Documents /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/surveys"
          element={<ProtectedRoute><Surveys /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/history"
          element={<ProtectedRoute><ParticipationHistory /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/ideas"
          element={<ProtectedRoute><IdeaBox /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/notifications"
          element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/catalog"
          element={<ProtectedRoute><ActivitiesCatalog /></ProtectedRoute>}
        />

        {/* FUNCTIONAL ADMIN */}
        <Route
          path="/dashboard/admin/activities"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageActivities /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/create"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><CreateActivity /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:slug/edit"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ModifyActivity /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:id/sessions"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageSessions /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:id/sessions/create"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><CreateSession /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:id/sessions/:sessionId"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><SessionDetails /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:id/sessions/:sessionId/edit"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><EditSession /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/activities/:id/sessions/:sessionId/sites-quotas"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><SitesAndQuotas /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/registrations"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageRegistrations /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/documents"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageDocuments /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/draw"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><LaunchDraw /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/draw/run/:sessionId"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><RunDraw /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/withdrawals"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageWithdrawals /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/reports"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><Reports /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/draw-history"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><DrawHistory /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/admin/site"
          element={<ProtectedRoute allowedRoles={["ADMIN_FONCTIONNEL"]}><ManageSite /></ProtectedRoute>}
        />

        {/* COMMUNICATOR */}
        <Route
          path="/dashboard/communicator/announcements"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><ManageAnnouncements /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/communicator/announcements/create"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><CreateAnnouncement /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/communicator/surveys"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><ManageSurveys /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/communicator/surveys/create"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><CreateSurveyNotice /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/communicator/ideas"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><IdeaBoxModeration /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/communicator/notifications"
          element={<ProtectedRoute allowedRoles={["COMMUNICATEUR"]}><ManageNotifications /></ProtectedRoute>}
        />

        {/* SYSTEM ADMIN */}
        <Route
          path="/dashboard/system/functional-admins"
          element={<ProtectedRoute allowedRoles={["ADMIN_SYSTEME"]}><ManageFunctionalAdmins /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/system/communicators"
          element={<ProtectedRoute allowedRoles={["ADMIN_SYSTEME"]}><ManageCommunicators /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/system/system-admins"
          element={<ProtectedRoute allowedRoles={["ADMIN_SYSTEME"]}><ManageSystemAdmins /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/system/audit-log"
          element={<ProtectedRoute allowedRoles={["ADMIN_SYSTEME"]}><AuditLogPage /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;