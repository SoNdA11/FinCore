// Este arquivo contém a lógica de controle para gerenciar rendas,
// incluindo adicionar, obter todas, excluir e fazer download em formato Excel.

const xlsx = require('xlsx');
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user?.id;

    try {
        const { icon, source, amount, date, description } = req.body;

        if (!description || !source || !amount || !date) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
            description
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error("Erro ao adicionar renda:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Renda deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
}

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map(item => ({
            Fonte: item.source,
            Descrição: item.description,
            Valor: item.amount,
            Data: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Rendimentos");

        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("Erro ao enviar o arquivo para download:", err);
            }
        });
    } catch (error) {
        console.error("Erro ao gerar Excel:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};