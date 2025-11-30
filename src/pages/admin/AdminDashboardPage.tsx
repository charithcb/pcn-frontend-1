import { useEffect, useState } from "react";
import { Badge, Card, Spinner } from "flowbite-react";
import axios from "../../api/axios";

type Metrics = {
    inventoryCount: number;
    pendingOrders: number;
    activeUsers: number;
};

const defaultMetrics: Metrics = {
    inventoryCount: 0,
    pendingOrders: 0,
    activeUsers: 0,
};

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState<Metrics>(defaultMetrics);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const response = await axios.get("/admin/metrics");
                setMetrics({
                    inventoryCount: response.data.inventoryCount ?? 0,
                    pendingOrders: response.data.pendingOrders ?? 0,
                    activeUsers: response.data.activeUsers ?? 0,
                });
            } catch (err) {
                console.error("Failed to load admin metrics", err);
                setError("Unable to load dashboard metrics right now.");
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner aria-label="Loading admin metrics" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Monitor the health of PCN Inventory and respond to customer needs quickly.
                </p>
            </div>

            {error && (
                <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <h2 className="text-sm font-medium text-gray-500">Inventory items</h2>
                    <p className="mt-2 text-3xl font-semibold">{metrics.inventoryCount}</p>
                    <Badge color="purple" className="mt-3 w-fit">
                        Synced with PCN Inventory
                    </Badge>
                </Card>

                <Card>
                    <h2 className="text-sm font-medium text-gray-500">Pending orders</h2>
                    <p className="mt-2 text-3xl font-semibold">{metrics.pendingOrders}</p>
                    <Badge color="warning" className="mt-3 w-fit">
                        Awaiting fulfillment
                    </Badge>
                </Card>

                <Card>
                    <h2 className="text-sm font-medium text-gray-500">Active users</h2>
                    <p className="mt-2 text-3xl font-semibold">{metrics.activeUsers}</p>
                    <Badge color="info" className="mt-3 w-fit">
                        Logged in today
                    </Badge>
                </Card>
            </div>
        </div>
    );
}
