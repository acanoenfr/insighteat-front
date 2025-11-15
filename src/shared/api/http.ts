import { env } from "@/app/env"
import { useAuthStore } from "../store/auth.store"

function getToken() {
    return useAuthStore.getState().token
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
    const token = getToken()

    const res = await fetch(`${env.VITE_API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers || {})
        },
        ...init
    })

    if (!res.ok) {
        if (res.status === 401) {
            useAuthStore.getState().logout()
        }
        const text = await res.text()
        throw new Error(`HTTP ${res.status}: ${text}`)
    }

    if (res.status === 204)
        return undefined as T

    return res.json() as Promise<T>
}

export const api = {
    get: <T>(p: string) => http<T>(p),
    post: <T>(p: string, body?: unknown) =>
        http<T>(p, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(p: string, body?: unknown) =>
        http<T>(p, { method: 'PUT', body: JSON.stringify(body) }),
    patch: <T>(p: string, body?: unknown) =>
        http<T>(p, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(p: string, body?: unknown) =>
        http<T>(p, { method: 'DELETE', body: JSON.stringify(body) })
}
