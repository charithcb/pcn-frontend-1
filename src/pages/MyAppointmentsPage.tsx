import { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "flowbite-react";
import axios from "../lib/axios";

interface Appointment {
    id: string;
    date: string;
    time: string;
    staffName: string;
    status: string;
}

export default function MyAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/appointment/my");
                setAppointments(res.data);
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
            <h1 className="text-xl font-semibold">My Appointments</h1>

            {loading ? (
                <Spinner />
            ) : (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Time</Table.HeadCell>
                        <Table.HeadCell>Staff</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {appointments.map((a) => (
                            <Table.Row key={a.id}>
                                <Table.Cell>
                                    {new Date(a.date).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>{a.time}</Table.Cell>
                                <Table.Cell>{a.staffName}</Table.Cell>
                                <Table.Cell>
                                    <Badge color="info">{a.status}</Badge>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {appointments.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={4} className="text-center text-gray-500">
                                    No appointments yet.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
