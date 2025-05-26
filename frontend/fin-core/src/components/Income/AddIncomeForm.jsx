// Este componente React fornece um formulário para que o usuário possa adicionar
// novas transações de renda, incluindo fonte, valor, data e um ícone.

import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (

        <div>

            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            {/* Input 1: Income Source */}
            <Input
                value={income.source}
                onChange={({ target }) => handleChange('source', target.value)}
                label="Fonte de Renda"
                placeholder="Freelancer, Salário, etc."
                type="text"
            />

            {/* Input 2: Amount */}
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', target.value)} 
                label="Valor"
                placeholder=""
                type="number"
            />

            {/* Input 3: Date */}
            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)} 
                label="Data"
                placeholder=""
                type="date"
            />

            {/* Button */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                >
                    Adicionar Renda
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;