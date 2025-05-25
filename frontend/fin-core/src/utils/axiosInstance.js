import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptador de pedidos HTTP (requisição)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptador de respostas HTTP 
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Tratar erros comuns globalmente
        if (error.response) {
            if (error.response.status === 401) {
                // Redireciona para a pág de Login
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Erro no servidor. Por favor, tente novamente mais tarde.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Tempo de requisição esgotado. Por favor, tente novamente.");
        } else {
            console.error("Erro de rede. Por favor, verifique sua conexão.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;