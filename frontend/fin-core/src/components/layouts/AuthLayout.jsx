import React from "react";
import CARD_3 from "../../assets/images/card3.png";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex ">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2 className="text-lg font-medium text-black">FinCore</h2>
                {children}
            </div>

            <div className="hidden md:block w-[40vw] h-screen bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden relative">
              
                <div className="w-[min(400px, 80%)] h-[min(400px, 80%)] rounded-full flex items-center justify-center  absolute top-1/2 right-8 -translate-y-1/2">
                    <img
                        src={CARD_3}
                        className="w-[100%] h-[100%] object-contain rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({icon, label, value, color}) => {
    return (
        <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
            <div
                className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
            >
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
                <span className="text-[20px]">${value}</span>
            </div>
        </div>
    );
};