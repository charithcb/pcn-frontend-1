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

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { user, logout } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-50 flex text-gray-900">
            <aside className="w-64 hidden md:block border-r bg-white">
                <Sidebar aria-label="Admin navigation" className="h-full">
                    <div className="px-4 py-3 text-lg font-semibold">Admin Console</div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem href="/admin">Dashboard</SidebarItem>
                            <SidebarItem href="/admin/inventory">Inventory</SidebarItem>
                            <SidebarItem href="/admin/orders">Orders</SidebarItem>
                            <SidebarItem href="/admin/users">Users</SidebarItem>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </aside>

            <div className="flex-1 flex flex-col">
                <Navbar className="border-b bg-white">
                    <NavbarBrand href="/admin">
                        <span className="self-center whitespace-nowrap text-xl font-semibold">
                            PCN Inventory Admin
                        </span>
                    </NavbarBrand>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {user?.name ?? user?.email ?? "Admin"}
                        </span>
                        <button
                            onClick={logout}
                            className="text-sm text-purple-700 hover:underline"
                        >
                            Logout
                        </button>
                        <NavbarToggle />
                    </div>
                </Navbar>

                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
