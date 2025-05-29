// Este componente React exibe uma lista das transações financeiras mais recentes do usuário,
// combinando tanto rendas quanto despesas, para uma visão geral no dashboard.

import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Atividade da Conta</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    Ver Todas <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.description} 
                        categoryOrSource={item.type === "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={item.date} 
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;