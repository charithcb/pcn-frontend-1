import { create } from "zustand";

interface AuthState {
    token: string | null;
    user: AuthUser | null;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
}

export interface AuthUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

const getStoredUser = (): AuthUser | null => {
    try {
        const stored = localStorage.getItem("user");
        return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
        return null;
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: getStoredUser(),

    login: (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ token, user });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
    },
}));
