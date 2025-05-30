// frontend/fin-core/src/components/layouts/AuthLayout.jsx

import React from "react";
// Removi CARD_3 já que a imagem que você enviou (image_24c236.jpg) sugere um logo diferente no painel direito.
// Se você quiser usar uma imagem de fundo no painel direito, você pode adicionar um `style={{ backgroundImage: 'url(seu_caminho_para_imagem.jpg)' }}`
// ou definir a classe `bg-auth-bg-img` no seu CSS.

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen items-center"> {/* Faz o layout ocupar a tela toda e centraliza verticalmente */}
            {/* Painel Esquerdo - Formulário */}
            <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 flex flex-col justify-center min-h-screen bg-white md:bg-transparent">
                {/* Logo/Título FinCore no topo do formulário */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-primary"></h1>
                </div>
                <div className="w-full max-w-md mx-auto"> {/* Adicionado max-w-md e mx-auto para melhor contenção do formulário */}
                    {children}
                </div>
            </div>

            {/* Painel Direito - Branding */}
            {/* A imagem que você enviou (image_24c236.jpg) mostra um logo e texto aqui.
                Vamos recriar essa estrutura. Se você tem uma imagem de fundo específica, adicione via CSS ou style.
            */}
            <div className="hidden md:flex w-1/2 lg:w-3/5 h-screen bg-primary/10 flex-col items-center justify-center p-12">
                {/* Aqui você pode colocar o seu logo e slogan.
                    Exemplo com placeholder para o logo:
                */}
                <div className="text-center">
                    {/* Substitua pelo seu componente de logo ou tag <img> */}
                    <div className="bg-primary text-white w-48 h-48 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-28">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    </div>
                    <h2 className="text-5xl font-bold text-primary mb-3">FinCore</h2>
                    <p className="text-xl text-gray-700">Financial Control Software</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

// O StatsInfoCard não parece ser usado neste layout, então removi para simplificar.
// Se você o usa em outro lugar, mantenha-o.