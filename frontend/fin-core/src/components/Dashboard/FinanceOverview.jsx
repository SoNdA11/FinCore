// Este componente React oferece uma visão geral financeira em formato de gráfico de pizza,
// destacando o saldo total, a renda total e as despesas totais do usuário.

import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#FA2C37", "#28A745"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [

        { name: "Total Expenses", amount: Math.abs(totalExpense) },
        { name: "Total Income", amount: Math.abs(totalIncome) },

    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Visão Financeira</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Saldo Total"
                totalAmount={`$${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;