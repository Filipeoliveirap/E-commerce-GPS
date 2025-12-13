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

    //implementar logout aqui
    
}));