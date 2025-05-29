// sonda11/fincore/FinCore-77506652eaa3d784901685ffec0e6b4ce8f1d784/frontend/fin-core/src/components/Income/IncomeOverview.jsx
import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
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
                <CustomBarChart data={chartData} xAxisDataKey="displayLabel" />
            </div>
        </div>
    );
};

export default IncomeOverview;