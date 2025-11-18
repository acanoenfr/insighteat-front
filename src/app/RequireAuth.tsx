import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuthStore } from "@/shared/store/auth.store"

export function RequireAuth() {
    const token = useAuthStore(s => s.token)
    const location = useLocation();

    if (!token)
        return <Navigate to="/sign_in" state={{ from: location }} replace />

    return <Outlet />
}
