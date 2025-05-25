const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// VERSÃO COM BUG DAS HORAS - MAS TA ORGANIZADO

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user?.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Erro ao adicionar renda:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Despesa deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
}

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Preparar os dados para exportação
        const data = expense.map(item => ({
            category: item.category,
            Amount: item.amount,
            Data: item.date.toISOString().split('T')[0], // opcional: formatar data
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Rendimentos");

        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        console.error("Erro ao gerar Excel:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};