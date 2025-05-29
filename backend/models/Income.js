// Este arquivo define o esquema (Schema) do Mongoose para o modelo de Renda no banco de dados.
// Ele especifica os campos e seus tipos para as transações de renda.

const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória'], 
        trim: true
    },
    source: {
        type: String,
        required: true,
        enum: [
            'Salário Fixo',
            'Salário Não Fixo (Freelance)',
            'Investimento',
            'Vendas',
            'Presente',
            'Bônus',
            'Aluguel Recebido',
            'Outros'
        ],
        default: 'Outros'
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);