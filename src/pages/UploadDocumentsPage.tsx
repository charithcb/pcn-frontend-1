import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
    Badge,
    Button,
    Card,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import axios from "../api/axios";

interface DocumentRow {
    id: string;
    type: string;
    verified: boolean;
    createdAt: string;
}

export default function UploadDocumentsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [docs, setDocs] = useState<DocumentRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const loadDocs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/document/my");
            setDocs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocs();
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        setFile(f ?? null);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            await axios.post("/document/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFile(null);
            await loadDocs();
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Documents</h1>

            <Card>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="font-medium">Upload a new document</p>
                        <p className="text-sm text-gray-500">
                            ID scans, proof of address, vehicle documents, etc.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="text-sm"
                        />
                        <Button
                            color="purple"
                            onClick={handleUpload}
                            disabled={!file || uploading}
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </Button>
                    </div>
                </div>
            </Card>

            {loading ? (
                <Spinner />
            ) : (
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Type</TableHeadCell>
                            <TableHeadCell>Verified</TableHeadCell>
                            <TableHeadCell>Uploaded</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {docs.map((d) => (
                            <TableRow key={d.id}>
                                <TableCell className="font-mono text-sm">{d.id}</TableCell>
                                <TableCell>{d.type}</TableCell>
                                <TableCell>
                                    <Badge color={d.verified ? "success" : "warning"}>
                                        {d.verified ? "Verified" : "Pending"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(d.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {docs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No documents uploaded yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
