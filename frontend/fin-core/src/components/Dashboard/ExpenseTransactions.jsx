// Este componente React exibe uma lista das despesas mais recentes do usuário no dashboard.
// Ele permite ver as últimas transações de despesas de forma rápida.

import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">Despesas Recentes</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    Ver Todas <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 4)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.description} 
                        categoryOrSource={expense.category} 
                        icon={expense.icon}
                        date={expense.date} 
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseTransactions;