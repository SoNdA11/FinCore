import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart
} from "recharts";
import { addThousandsSeparator } from '../../utils/helper';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        return (
            <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200 min-w-[200px]">
                <p className="text-xs text-gray-500 mb-1">
                    Data: {dataPoint.displayDate}
                </p>
                <p className="text-sm font-semibold text-purple-700 capitalize mb-0.5">
                    {dataPoint.category}
                </p>
                {dataPoint.description && (
                    <p className="text-xs text-gray-600 mb-1 italic">
                        {dataPoint.description}
                    </p>
                )}
                <p className="text-sm text-gray-800">
                    Valor: <span className="font-medium text-gray-900">${addThousandsSeparator(dataPoint.amount)}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data }) => {
    const xAxisTickProps = {
        fontSize: 11,
        fill: "#555",
        angle: -35,
        textAnchor: "end",
        dy: 10,
    };

    return (
        <div className="bg-white py-4">
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 70,
                    }}
                >
                    <defs>
                        <linearGradient id="expenseGradientLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis
                        dataKey="displayDate"
                        tick={xAxisTickProps}
                        stroke="#ccc"
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="#ccc"
                        tickFormatter={(value) => `$${addThousandsSeparator(value)}`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#875cf5', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#875cf5"
                        fill="url(#expenseGradientLine)"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#875cf5", stroke: "#fff", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#fff", stroke: "#875cf5", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;