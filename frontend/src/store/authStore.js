import {create} from "zustand";
import { storage } from "../service/storageService";

const persistedToken = storage.getToken();
const persistedUser = storage.getUser();
const hasPersistedSession = !!(persistedToken && persistedUser && persistedUser.name);

export const useAuthStore = create((set) => ({
    user: hasPersistedSession ? persistedUser : null,
    token: hasPersistedSession ? persistedToken : null,
    isAuthenticated: hasPersistedSession,
    
    login(user, token, rememberMe = false) { 
        storage.setAuth(token, user, rememberMe);
        set({ user, token, isAuthenticated: true }); 
    },

    logout() {
        storage.clearAuth();
        set({ user: null, token: null, isAuthenticated: false });
    },

    updateUser(updateUser) {
        storage.setUser(updateUser);
        set({ user: updateUser });
    }
}));