// Este componente React fornece um formulário para que o usuário possa adicionar
// novas transações de despesas, incluindo categoria, valor, data e um ícone.

import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Categoria"
                placeholder="Assinaturas, Aluguel, etc."
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Valor"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Data"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(income)}
                >
                    Adicionar Despesa
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
