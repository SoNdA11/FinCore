// Este componente React renderiza uma legenda personalizada para ser usada com gráficos,
// exibindo os itens e suas cores correspondentes.

import React from 'react'

const CustomLegend = ({ payload }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center space-x-2">
                    <div
                        className="w-2 h-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs text-gray-700 font-medium">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default CustomLegend