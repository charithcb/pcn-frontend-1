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
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Date</TableHeadCell>
                            <TableHeadCell>Time</TableHeadCell>
                            <TableHeadCell>Staff</TableHeadCell>
                            <TableHeadCell>Status</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {appointments.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell>
                                    {new Date(a.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{a.time}</TableCell>
                                <TableCell>{a.staffName}</TableCell>
                                <TableCell>
                                    <Badge color="info">{a.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {appointments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No appointments yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
