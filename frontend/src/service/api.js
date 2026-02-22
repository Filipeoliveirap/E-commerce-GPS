import axios from "axios";
import { BASE_URL } from "../constants/api";
import { storage } from "./storageService";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach Authorization header when token is available
api.interceptors.request.use(
    (config) => {
        const token = storage.getToken();
        console.log("🔐 Interceptor: token obtido =", token ? `${token.substring(0, 20)}...` : "NULO");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
            console.log("✅ Header Authorization adicionado:", config.headers.Authorization.substring(0, 30) + "...");
        } else {
            console.warn("⚠️ AVISO: Token não encontrado no localStorage!");
        }
        return config;
    },
    (error) => Promise.reject(error),
);