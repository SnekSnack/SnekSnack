import ProtectedRoute from "@/components/ProtectedRoute";

function Test() {
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>Only authenticated users can see this page.</p>
        </div>
    );
}


export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <Test />
        </ProtectedRoute>
        // <Test />
    );
}