// Este componente React fornece uma visão geral das despesas do usuário,
// exibindo um gráfico de linha para acompanhar os hábitos de gasto ao longo do tempo.

import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {

    const [chartData, setCharData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setCharData(result);

        return () => { };
    }, [transactions]);

    return <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Visão Geral das Despesas</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Acompanhe seus hábitos de gasto ao longo do tempo e descubra para onde seu dinheiro está indo.
                </p>
            </div>

            <button className="add-btn"
                onClick={onExpenseIncome}>
                <LuPlus className="text-lg" />
                Adicionar Despesa
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData} />
        </div>
    </div>

}

export default ExpenseOverview