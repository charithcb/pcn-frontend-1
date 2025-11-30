import { Outlet, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import VehicleBrowsePage from "./pages/VehicleBrowsePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyShipmentsPage from "./pages/MyShipmentsPage";
import UploadDocumentsPage from "./pages/UploadDocumentsPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import ProtectedRoute from "./router/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminInventoryPage from "./pages/admin/AdminInventoryPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

const CustomerShell = () => (
    <ProtectedRoute>
        <CustomerLayout>
            <Outlet />
        </CustomerLayout>
    </ProtectedRoute>
);

const AdminShell = () => (
    <ProtectedRoute roles={["admin"]}>
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    </ProtectedRoute>
);

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route element={<CustomerShell />}>
                <Route path="/dashboard" element={<CustomerDashboardPage />} />
                <Route path="/vehicles" element={<VehicleBrowsePage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/shipments" element={<MyShipmentsPage />} />
                <Route path="/documents" element={<UploadDocumentsPage />} />
                <Route path="/reservations" element={<MyReservationsPage />} />
                <Route path="/appointments" element={<MyAppointmentsPage />} />
            </Route>

            <Route element={<AdminShell />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/inventory" element={<AdminInventoryPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
            </Route>

            <Route path="*" element={<div className="p-8">Page not found</div>} />
        </Routes>
    );
}
