import { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "flowbite-react";
import axios from "../lib/axios";

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
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Vehicle</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {reservations.map((r) => (
                            <Table.Row key={r.id}>
                                <Table.Cell className="font-mono text-sm">{r.id}</Table.Cell>
                                <Table.Cell>{r.vehicle}</Table.Cell>
                                <Table.Cell>
                                    <Badge color="info">{r.status}</Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(r.reservedDate).toLocaleDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {reservations.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={4} className="text-center text-gray-500">
                                    No reservations yet.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
