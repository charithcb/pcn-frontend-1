import { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "flowbite-react";
import axios from "../lib/axios";

interface Shipment {
    id: string;
    orderId: string;
    vehicle: string;
    status: string;
    lastUpdated: string;
}

export default function MyShipmentsPage() {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/delivery/my"); // adapt to your backend route
                setShipments(res.data);
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
            <h1 className="text-xl font-semibold">My Shipments</h1>

            {loading ? (
                <Spinner />
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Tracking ID</Table.HeadCell>
                        <Table.HeadCell>Order</Table.HeadCell>
                        <Table.HeadCell>Vehicle</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Last Updated</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {shipments.map((s) => (
                            <Table.Row key={s.id}>
                                <Table.Cell className="font-mono text-sm">{s.id}</Table.Cell>
                                <Table.Cell className="font-mono text-xs">
                                    {s.orderId}
                                </Table.Cell>
                                <Table.Cell>{s.vehicle}</Table.Cell>
                                <Table.Cell>
                                    <Badge color="purple">{s.status}</Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(s.lastUpdated).toLocaleString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {shipments.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={5} className="text-center text-gray-500">
                                    No active shipments.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
