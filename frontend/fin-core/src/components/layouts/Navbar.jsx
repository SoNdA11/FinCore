// frontend/fin-core/src/components/layouts/Navbar.jsx
import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu"; // Certifique-se que o caminho para SideMenu está correto
import fincoreLogoPng from '../../assets/images/fincore-logo1.png'; // Importando o logo PNG

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    // Função para navegar para o dashboard (ou outra página inicial)
    const navigateToHome = () => {
        window.location.href = '/dashboard'; 
    };

    return (
        <div className="flex items-center gap-3 md:gap-4 bg-white border-b border-slate-200/70 backdrop-blur-[2px] py-3 px-4 md:px-7 sticky top-0 z-30 shadow-sm">
            <button
                className="block lg:hidden text-slate-700 hover:text-primary p-1 -ml-1" // Ajuste de cor e padding
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
                aria-label={openSideMenu ? "Fechar menu" : "Abrir menu"} // Para acessibilidade
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            {/* Logo Gráfico + Nome */}
            <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={navigateToHome} // Adiciona a funcionalidade de clique
                title="Ir para o Dashboard" // Tooltip para o link
            >
                <img 
                    src={fincoreLogoPng} 
                    alt="FinCore Logo" 
                    className="h-8 w-auto md:h-9" // Ajuste o tamanho com h- (altura)
                />
                <span className="text-xl font-semibold text-primary hidden sm:block">
                    FinCore
                </span>
            </div>
            
            {/* Container para o menu lateral em modo mobile */}
            {openSideMenu && (
                <div 
                    className="fixed inset-0 top-[60px] bg-black/30 z-30 lg:hidden" // Overlay para o fundo
                    onClick={() => setOpenSideMenu(false)} // Fecha o menu ao clicar no overlay
                >
                    <div 
                        className="fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-white z-40 shadow-xl w-64 transform transition-transform duration-300 ease-in-out lg:hidden"
                        // Impede que o clique no menu feche o menu
                        onClick={(e) => e.stopPropagation()} 
                        style={{ transform: openSideMenu ? 'translateX(0)' : 'translateX(-100%)' }} // Animação de entrada/saída
                    >
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                </div>
            )}
        </div >
    )
}

export default Navbar;