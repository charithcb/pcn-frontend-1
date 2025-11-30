import { useEffect, useState } from "react";
import { Badge, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from "../../api/axios";

type Order = {
    id: string;
    customer: string;
    status: string;
    total?: number;
};

const statusColors: Record<string, "success" | "info" | "warning" | "failure"> = {
    completed: "success",
    shipped: "info",
    pending: "warning",
    cancelled: "failure",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await axios.get("/orders");
                setOrders(response.data.orders ?? response.data ?? []);
            } catch (err) {
                console.error("Failed to load orders", err);
                setError("Unable to load orders from PCN Inventory backend.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner aria-label="Loading orders" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
                <p className="text-gray-600 text-sm">Track orders synced from the PCN Inventory service.</p>
            </div>

            {error && (
                <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded border border-gray-200 bg-white">
                <Table>
                    <TableHead>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Customer</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>Total</TableHeadCell>
                    </TableHead>

                    <TableBody className="divide-y">
                        {orders.map((order) => (
                            <TableRow key={order.id} className="bg-white dark:border-gray-700">
                                <TableCell className="text-sm text-gray-700">{order.id}</TableCell>
                                <TableCell className="font-medium text-gray-900">{order.customer}</TableCell>
                                <TableCell>
                                    <Badge color={statusColors[order.status] ?? "info"}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-700">
                                    {order.total !== undefined ? `$${order.total.toFixed(2)}` : "-"}
                                </TableCell>
                            </TableRow>
                        ))}

                        {!orders.length && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
