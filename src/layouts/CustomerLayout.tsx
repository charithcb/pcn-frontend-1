import type { ReactNode } from "react";
import { Navbar, Sidebar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../stores/authStore";

interface CustomerLayoutProps {
    children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
    const { user, logout } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-50 flex text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 hidden md:block border-r bg-white">
                <Sidebar aria-label="Customer navigation" className="h-full">
                    <Sidebar.Logo href="/dashboard" img={undefined}>
                        <span className="font-semibold tracking-tight">PCN Inventory</span>
                    </Sidebar.Logo>

                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item as={NavLink} to="/dashboard">
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/vehicles">
                                Vehicles
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/orders">
                                My Orders
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/shipments">
                                My Shipments
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/documents">
                                Documents
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/reservations">
                                Reservations
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/appointments">
                                Appointments
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Top navbar */}
                <Navbar className="border-b bg-white">
                    <Navbar.Brand as={Link} to="/dashboard">
            <span className="self-center whitespace-nowrap text-xl font-semibold">
              Customer Portal
            </span>
                    </Navbar.Brand>

                    <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.name ?? user?.email}
            </span>
                        <button
                            onClick={logout}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Logout
                        </button>
                        <Navbar.Toggle />
                    </div>
                </Navbar>

                {/* Content */}
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
