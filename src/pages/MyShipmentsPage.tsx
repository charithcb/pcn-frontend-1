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
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Tracking ID</TableHeadCell>
                            <TableHeadCell>Order</TableHeadCell>
                            <TableHeadCell>Vehicle</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell>Last Updated</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {shipments.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="font-mono text-sm">{s.id}</TableCell>
                                <TableCell className="font-mono text-xs">{s.orderId}</TableCell>
                                <TableCell>{s.vehicle}</TableCell>
                                <TableCell>
                                    <Badge color="purple">{s.status}</Badge>
                                </TableCell>
                                <TableCell>{new Date(s.lastUpdated).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        {shipments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    No active shipments.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
