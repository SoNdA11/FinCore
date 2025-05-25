import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setDashboardData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setDashboardData(result); 
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">Visão Geral da Renda</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Acompanhe seus ganhos ao longo do tempo e analise as tendências da sua renda.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Adicionar Renda
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverview;
