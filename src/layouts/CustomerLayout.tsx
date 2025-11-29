import type { ReactNode } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarToggle,
    Sidebar,
    SidebarItems,
    SidebarItem,
    SidebarItemGroup,
} from "flowbite-react";
import { useAuthStore } from "../store/authStore";

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
                    <div className="px-4 py-3 text-lg font-semibold">PCN Inventory</div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem href="/dashboard">Dashboard</SidebarItem>
                            <SidebarItem href="/vehicles">Vehicles</SidebarItem>
                            <SidebarItem href="/orders">My Orders</SidebarItem>
                            <SidebarItem href="/shipments">My Shipments</SidebarItem>
                            <SidebarItem href="/documents">Documents</SidebarItem>
                            <SidebarItem href="/reservations">Reservations</SidebarItem>
                            <SidebarItem href="/appointments">Appointments</SidebarItem>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Top navbar */}
                <Navbar className="border-b bg-white">
                    <NavbarBrand href="/dashboard">
                        <span className="self-center whitespace-nowrap text-xl font-semibold">
                            Customer Portal
                        </span>
                    </NavbarBrand>

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
                        <NavbarToggle />
                    </div>
                </Navbar>

                {/* Content */}
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
