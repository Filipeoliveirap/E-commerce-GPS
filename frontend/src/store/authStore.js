import {create} from "zustand";
import { storage } from "../service/storageService";

export const useAuthStore = create((set) => ({
    user: storage.getUser(),
    token: storage.getToken(),
    isAuthenticated: !!storage.getToken(),
    
    login(user, token) { 
        storage.setAuth(token, user);
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