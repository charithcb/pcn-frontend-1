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

interface Reservation {
    id: string;
    vehicle: string;
    status: string;
    reservedDate: string;
}

export default function MyReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/reservation/my");
                setReservations(res.data);
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
            <h1 className="text-xl font-semibold">My Reservations</h1>

            {loading ? (
                <Spinner />
            ) : (
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Vehicle</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                            <TableHeadCell>Date</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {reservations.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell className="font-mono text-sm">{r.id}</TableCell>
                                <TableCell>{r.vehicle}</TableCell>
                                <TableCell>
                                    <Badge color="info">{r.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(r.reservedDate).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {reservations.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No reservations yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
