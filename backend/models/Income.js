// Este arquivo define o esquema (Schema) do Mongoose para o modelo de Renda no banco de dados.
// Ele especifica os campos e seus tipos para as transações de renda.

const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    source: { type: String, required: true }, 
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);