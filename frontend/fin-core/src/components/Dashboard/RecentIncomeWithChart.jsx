// Este componente React exibe um gráfico de pizza que representa as rendas do usuário
// nos últimos 60 dias, oferecendo uma visão da composição dos ganhos.

import React, { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#875cf5", "#FA2C37", "#FF6900", "#4F39F6", "#33C7FF", "#FFDA33", "#FF7F50", "#DA70D6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const [totalIncomeLast60Days, setTotalIncomeLast60Days] = useState(0);

    const prepareChartData = () => {
        if (!data || data.length === 0) {
            setChartData([]);
            setTotalIncomeLast60Days(0);
            return;
        }

        const groupedData = data.reduce((acc, item) => {
            const sourceName = item?.source || "Desconhecida";
            if (!acc[sourceName]) {
                acc[sourceName] = { name: sourceName, amount: 0 };
            }
            acc[sourceName].amount += (item?.amount || 0);
            return acc;
        }, {});

        const dataArr = Object.values(groupedData).map(item => ({
            ...item,
            amount: parseFloat(item.amount.toFixed(2))
        }));

        const currentTotalLast60Days = dataArr.reduce((sum, item) => sum + item.amount, 0);

        setChartData(dataArr);
        setTotalIncomeLast60Days(parseFloat(currentTotalLast60Days.toFixed(2)));
    };
    useEffect(() => {
        prepareChartData();
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Renda por Categoria dos Últimos 60 Dias</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Renda (60d)"
                totalAmount={`$${addThousandsSeparator(totalIncomeLast60Days)}`}
                showTextAnchor
                colors={COLORS}
            />

        </div>
    );
};

export default RecentIncomeWithChart;