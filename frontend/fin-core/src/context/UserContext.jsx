// Este arquivo cria e gerencia o contexto do usuário no React,
// fornecendo o estado global do usuário e funções para atualizá-lo ou limpá-lo,
// permitindo que componentes em diferentes níveis da árvore acessem essas informações.

import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    }

    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;