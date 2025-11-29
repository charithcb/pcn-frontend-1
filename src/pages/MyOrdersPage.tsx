import { useEffect, useState } from "react";
import {
    Badge,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import axios from "../api/axios";

interface Order {
    id: string;
    vehicle: string;
    status: string;
    createdAt: string;
}

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/order/my"); // adjust to your backend route
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">My Orders</h1>

            {loading ? (
                <Spinner />
            ) : (
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Order ID</TableHeadCell>
                            <TableHeadCell>Vehicle</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell>Created</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {orders.map((o) => (
                            <TableRow key={o.id}>
                                <TableCell className="font-mono text-sm">{o.id}</TableCell>
                                <TableCell>{o.vehicle}</TableCell>
                                <TableCell>
                                    <Badge color="info">{o.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(o.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No orders yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
