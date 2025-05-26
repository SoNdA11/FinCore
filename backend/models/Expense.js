// Este arquivo define o esquema (Schema) do Mongoose para o modelo de Despesa no banco de dados.
// Ele especifica os campos e seus tipos para as transações de despesas.

const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true }, // Exemplo: Comida, Assinaturas
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);