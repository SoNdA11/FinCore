// Este componente React fornece um formulário para que o usuário possa adicionar
// novas transações de renda, incluindo fonte, valor, data e um ícone.

import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const INCOME_CATEGORIES = [
    'Salário Fixo',
    'Salário Não Fixo (Freelance)',
    'Investimento',
    'Vendas',
    'Presente',
    'Bônus',
    'Aluguel Recebido',
    'Outros'
];

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        description: "",
        source: INCOME_CATEGORIES[0],
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

            <Input
                value={income.description}
                onChange={({ target }) => handleChange('description', target.value)}
                label="Descrição (ex: Projeto X)"
                placeholder="Detalhes da receita"
                type="text"
            />

            <div className="form-group mb-4 mt-3">
                <label htmlFor="income-source" className="text-[13px] text-slate-800">Fonte de Renda</label>
                <div className="input-box">
                    <select
                        id="income-source"
                        value={income.source}
                        onChange={({ target }) => handleChange('source', target.value)}
                        className="w-full bg-transparent outline-none"
                        required
                    >
                        {INCOME_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Valor"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Data"
                placeholder=""
                type="date"
            />

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