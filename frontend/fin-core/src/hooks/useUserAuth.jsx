// Este é um hook customizado do React para verificar o status de autenticação do usuário.
// Ele tenta buscar as informações do usuário logado e, se não for bem-sucedido ou o token for inválido,
// desloga o usuário e o redireciona para a página de login.

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance"; 
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    
    const { user, updateUser, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Falha ao buscar as informações do usuário:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);
};