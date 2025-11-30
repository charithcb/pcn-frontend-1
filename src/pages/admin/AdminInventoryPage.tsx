import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    TextInput,
} from "flowbite-react";
import axios from "../../api/axios";

type InventoryItem = {
    id: string;
    name: string;
    category?: string;
    stock: number;
    price?: number;
};

export default function AdminInventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const response = await axios.get("/inventory");
                setItems(response.data.items ?? response.data ?? []);
            } catch (err) {
                console.error("Failed to load inventory", err);
                setError("Unable to load inventory from PCN Inventory backend.");
            } finally {
                setLoading(false);
            }
        };

        loadInventory();
    }, []);

    const filteredItems = useMemo(() => {
        const normalizedSearch = search.toLowerCase();
        return items.filter((item) =>
            [item.name, item.category].some((value) => value?.toLowerCase().includes(normalizedSearch))
        );
    }, [items, search]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner aria-label="Loading inventory" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
                    <p className="text-gray-600 text-sm">Live data from the PCN Inventory service.</p>
                </div>

                <div className="flex gap-2">
                    <TextInput
                        placeholder="Search inventory"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Button color="purple" onClick={() => setSearch("")}>
                        Clear
                    </Button>
                </div>
            </div>

            {error && (
                <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded border border-gray-200 bg-white">
                <Table>
                    <TableHead>
                        <TableHeadCell className="w-1/5">Name</TableHeadCell>
                        <TableHeadCell className="w-1/5">Category</TableHeadCell>
                        <TableHeadCell className="w-1/5">Stock</TableHeadCell>
                        <TableHeadCell className="w-1/5">Price</TableHeadCell>
                        <TableHeadCell className="w-1/5">ID</TableHeadCell>
                    </TableHead>

                    <TableBody className="divide-y">
                        {filteredItems.map((item) => (
                            <TableRow key={item.id} className="bg-white dark:border-gray-700">
                                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                                <TableCell className="text-gray-600">{item.category ?? "Uncategorized"}</TableCell>
                                <TableCell className="text-gray-600">{item.stock}</TableCell>
                                <TableCell className="text-gray-600">
                                    {item.price !== undefined ? `$${item.price.toFixed(2)}` : "-"}
                                </TableCell>
                                <TableCell className="text-xs text-gray-500">{item.id}</TableCell>
                            </TableRow>
                        ))}

                        {!filteredItems.length && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    No inventory found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
