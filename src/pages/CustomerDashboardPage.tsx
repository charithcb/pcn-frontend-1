import { Card, Badge } from "flowbite-react";

export default function CustomerDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back 👋
            </h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <h2 className="text-sm font-medium text-gray-500">My Orders</h2>
                    <p className="mt-2 text-3xl font-semibold">0</p>
                    <Badge color="info" className="w-fit mt-3">
                        View orders
                    </Badge>
                </Card>

                <Card>
                    <h2 className="text-sm font-medium text-gray-500">Active Shipments</h2>
                    <p className="mt-2 text-3xl font-semibold">0</p>
                    <Badge color="purple" className="w-fit mt-3">
                        Track shipments
                    </Badge>
                </Card>

                <Card>
                    <h2 className="text-sm font-medium text-gray-500">
                        Upcoming Appointments
                    </h2>
                    <p className="mt-2 text-3xl font-semibold">0</p>
                    <Badge color="success" className="w-fit mt-3">
                        View appointments
                    </Badge>
                </Card>
            </div>
        </div>
    );
}
