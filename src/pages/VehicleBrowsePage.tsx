import { useEffect, useState } from "react";
import { Card, TextInput, Select, Button, Spinner } from "flowbite-react";
import axios from "../api/axios";

interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
}

export default function VehicleBrowsePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<string>("");

    const loadVehicles = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/vehicle", {
                params: { q: search || undefined, status: status || undefined },
            });
            setVehicles(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Browse Vehicles</h1>

            <div className="flex flex-col md:flex-row gap-3 md:items-end">
                <div className="flex-1">
                    <TextInput
                        placeholder="Search by make / model / year"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="w-48">
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All statuses</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="SOLD">Sold</option>
                    </Select>
                </div>

                <Button color="purple" onClick={loadVehicles}>
                    Apply filters
                </Button>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="grid gap-4 md:grid-cols-3">
                    {vehicles.map((v) => (
                        <Card key={v.id}>
                            <h2 className="text-lg font-semibold">
                                {v.year} {v.make} {v.model}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                                Status:{" "}
                                <span className="font-medium text-gray-800">{v.status}</span>
                            </p>
                            <p className="text-xl font-semibold text-gray-900">
                                LKR {v.price.toLocaleString()}
                            </p>
                        </Card>
                    ))}
                    {vehicles.length === 0 && (
                        <p className="text-gray-500 col-span-full">
                            No vehicles found for this filter.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
