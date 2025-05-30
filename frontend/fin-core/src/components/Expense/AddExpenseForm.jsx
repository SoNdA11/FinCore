// Este componente React fornece um formulário para que o usuário possa adicionar
// novas transações de despesas, incluindo categoria, valor, data e um ícone.

import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const EXPENSE_CATEGORIES = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Entretenimento',
    'Saúde',
    'Educação',
    'Compras',
    'Serviços',
    'Contas',
    'Viagem',
    'Lazer',
    'Outros'
];

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        description: "",
        category: EXPENSE_CATEGORIES[0],
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.description}
                onChange={({ target }) => handleChange("description", target.value)}
                label="Descrição (ex: Netflix)"
                placeholder="Detalhes da despesa"
                type="text"
            />

            <div className="form-group mb-4 mt-3">
                <label htmlFor="expense-category" className="text-[13px] text-slate-800">Categoria</label>
                <div className="input-box">
                    <select
                        id="expense-category"
                        value={expense.category}
                        onChange={({ target }) => handleChange("category", target.value)}
                        className="w-full bg-transparent outline-none"
                        required
                    >
                        {EXPENSE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Valor"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Data"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(expense)}
                >
                    Adicionar Despesa
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;