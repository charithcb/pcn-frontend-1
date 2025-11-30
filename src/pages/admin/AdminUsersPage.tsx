import { useEffect, useState } from "react";
import { Badge, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from "../../api/axios";

type User = {
    id: string;
    name: string;
    email: string;
    role?: string;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get("/users");
                setUsers(response.data.users ?? response.data ?? []);
            } catch (err) {
                console.error("Failed to load users", err);
                setError("Unable to load users from PCN Inventory backend.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner aria-label="Loading users" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                <p className="text-gray-600 text-sm">Manage access for the PCN Inventory platform.</p>
            </div>

            {error && (
                <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded border border-gray-200 bg-white">
                <Table>
                    <TableHead>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Role</TableHeadCell>
                        <TableHeadCell>User ID</TableHeadCell>
                    </TableHead>

                    <TableBody className="divide-y">
                        {users.map((user) => (
                            <TableRow key={user.id} className="bg-white dark:border-gray-700">
                                <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                                <TableCell className="text-gray-700">{user.email}</TableCell>
                                <TableCell>
                                    <Badge color={user.role === "admin" ? "purple" : "info"}>
                                        {user.role ?? "customer"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-gray-500">{user.id}</TableCell>
                            </TableRow>
                        ))}

                        {!users.length && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
