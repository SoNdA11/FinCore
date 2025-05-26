// Este componente React exibe um gráfico de pizza que representa as rendas do usuário
// nos últimos 60 dias, oferecendo uma visão da composição dos ganhos.

import React, { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#FA2C37", "#FF6900", "#4F39F6"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
        return () => {};
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Renda dos Últimos 60 Dias</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Renda Total"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />

        </div>
    );
};

export default RecentIncomeWithChart;