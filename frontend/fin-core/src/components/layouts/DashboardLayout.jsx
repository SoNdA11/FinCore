// Este componente de layout React define a estrutura principal para as páginas do dashboard,
// incluindo a barra de navegação superior (Navbar) e o menu lateral (SideMenu),
// garantindo uma experiência de usuário consistente.

import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext); 
    
    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
