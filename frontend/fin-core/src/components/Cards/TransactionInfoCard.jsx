// Este componente React exibe os detalhes de uma transação financeira,
// seja uma renda ou uma despesa, incluindo o título, ícone, data e valor.

import React from 'react';
import moment from 'moment';
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    categoryOrSource,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
}) => {

    const getAmountStyles = () => type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    const formattedDate = moment.utc(date).format("Do MMM YY");

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <LuUtensils />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <h6 className="text-sm text-gray-700 font-medium">{title}</h6>
                    {categoryOrSource && (
                        <p className="text-xs text-gray-500">{categoryOrSource}</p>
                    )}
                    <span className="text-xs text-gray-500 mt-1">{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"} ${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;