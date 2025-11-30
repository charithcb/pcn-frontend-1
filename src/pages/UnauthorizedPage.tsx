export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="max-w-lg rounded border border-red-100 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-500">Access denied</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-900">You don't have permission</h1>
                <p className="mt-2 text-gray-600">
                    Please sign in with an authorized account or contact an administrator to request
                    access to this area of PCN Inventory.
                </p>
            </div>
        </div>
    );
}
