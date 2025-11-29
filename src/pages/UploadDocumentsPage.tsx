import { useEffect, useState, ChangeEvent } from "react";
import { Card, Button, Table, Badge, Spinner } from "flowbite-react";
import axios from "../lib/axios";

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
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Verified</Table.HeadCell>
                        <Table.HeadCell>Uploaded</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {docs.map((d) => (
                            <Table.Row key={d.id}>
                                <Table.Cell className="font-mono text-sm">{d.id}</Table.Cell>
                                <Table.Cell>{d.type}</Table.Cell>
                                <Table.Cell>
                                    <Badge color={d.verified ? "success" : "warning"}>
                                        {d.verified ? "Verified" : "Pending"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(d.createdAt).toLocaleDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {docs.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={4} className="text-center text-gray-500">
                                    No documents uploaded yet.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
}
