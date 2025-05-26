// Este componente React oferece uma visão geral financeira em formato de gráfico de pizza,
// destacando o saldo total, a renda total e as despesas totais do usuário.

import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#FA2C37", "#FF6900"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Despesas Totais</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Saldo Total"
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
