// Este arquivo contém dados estáticos e configurações, como a estrutura do menu lateral do dashboard,
// incluindo rótulos, ícones e caminhos para as páginas.

import {
    LuLayoutDashboard, 
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },

    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];