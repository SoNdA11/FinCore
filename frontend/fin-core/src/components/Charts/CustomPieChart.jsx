// Este componente React renderiza um gráfico de pizza personalizável usando a biblioteca Recharts.
// É utilizado para mostrar a distribuição de valores, como o saldo total em relação a rendas e despesas.

import React from "react";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Text
} from "recharts";

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {

    const renderCenterText = ({ cx, cy }) => {

        if (!showTextAnchor) {
            return null;
        }

        return (
            <g>
                <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="18px"
                >
                    {label}
                </text>
                <text
                    x={cx}
                    y={cy + 15}
                    textAnchor="middle"
                    fill="333"
                    fontSize="24px"
                    fontWeight="semi-bold"
                >
                    {totalAmount}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                    label={renderCenterText}

                >
                    {data.map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>


                <Tooltip content={CustomTooltip} />


                <Legend content={CustomLegend} />

            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;