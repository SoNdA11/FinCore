// frontend/fin-core/src/components/Charts/CustomBarChart.jsx

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

// Função para truncar o texto do tick do eixo X
const truncateTick = (tick, limit = 8) => { // Limite de caracteres ajustável
    if (tick && typeof tick === 'string' && tick.length > limit) {
        return `${tick.substring(0, limit)}...`;
    }
    return tick;
};

const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        // O 'label' aqui já é o valor original (não truncado) vindo do dataKey do XAxis
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300 min-w-[150px]">
                <p className="text-xs font-semibold text-purple-800 mb-1 capitalize">
                    {label} 
                </p>
                {dataPoint.source && dataPoint.source !== label && (
                    <p className="text-xs text-gray-500">Fonte: {dataPoint.source}</p>
                )}
                {dataPoint.formattedDate && (
                    <p className="text-xs text-gray-500">Data: {dataPoint.formattedDate}</p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                    Amount: <span className="text-sm font-medium text-gray-900">${dataPoint.amount}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomBarChart = ({ data, xAxisDataKey = "categoryName" }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    // Configuração dos ticks do eixo X com rotação e ajuste de dy
    const xAxisTickProps = {
        fontSize: 10,
        fill: "#555",
        angle: -45,       // Rotaciona o texto em -45 graus
        textAnchor: "end", // Alinha o final do texto rotacionado ao ponto do tick
        dy: 5             // Pequeno ajuste vertical para baixo
    };


    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 70, // Aumente a margem inferior para acomodar os rótulos rotacionados
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                        dataKey={xAxisDataKey}
                        tick={xAxisTickProps}
                        stroke="#ccc"
                        interval={0} // Mantém todos os rótulos (ou suas versões truncadas)
                        tickFormatter={(value) => truncateTick(value, 8)} // Aplica o truncamento
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: "#555" }}
                        stroke="#ccc"
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltipContent />} />
                    <Bar
                        dataKey="amount"
                        radius={[6, 6, 0, 0]}
                    >
                        {data && data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;