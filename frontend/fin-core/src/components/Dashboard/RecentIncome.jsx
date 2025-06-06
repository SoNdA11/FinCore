// Este componente React exibe uma lista das fontes de renda mais recentes do usuário no dashboard.
// Ele permite uma visualização rápida dos últimos ganhos.

import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Fontes de renda</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    Ver Todas <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.description}
                        categoryOrSource={item.source}
                        icon={item.icon}
                        date={item.date}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentIncome;