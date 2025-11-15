import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
    token?: string
    login: (token: string, email?: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: undefined,
            login: token => set({ token }),
            logout: () => set({ token: undefined })
        }),
        { name: 'auth' }
    )
)
