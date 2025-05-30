// Este arquivo contém a lógica de controle para gerenciar despesas,
// incluindo adicionar, obter todas, excluir e fazer download em formato Excel.

const xlsx = require('xlsx');
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    const userId = req.user?.id;

    try {
        const { icon, category, amount, date, description } = req.body;

        if (!description || !category || !amount || !date) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount: Number(amount),
            date: new Date(date),
            description,
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Erro ao adicionar despesa:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Despesa deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map(item => ({
            Categoria: item.category,
            Descrição: item.description,
            Valor: item.amount,
            Data: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Despesas");

        const filePath = "expense_details.xlsx";
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