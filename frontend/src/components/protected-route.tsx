import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
}

export default function ProtectedRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
}