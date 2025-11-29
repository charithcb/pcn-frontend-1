import { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "flowbite-react";
import axios from "../lib/axios";

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
                    <Table.Head>
                        <Table.HeadCell>Order ID</Table.HeadCell>
                        <Table.HeadCell>Vehicle</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Created</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {orders.map((o) => (
                            <Table.Row key={o.id}>
                                <Table.Cell className="font-mono text-sm">{o.id}</Table.Cell>
                                <Table.Cell>{o.vehicle}</Table.Cell>
                                <Table.Cell>
                                    <Badge color="info">{o.status}</Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(o.createdAt).toLocaleDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {orders.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={4} className="text-center text-gray-500">
                                    No orders yet.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
