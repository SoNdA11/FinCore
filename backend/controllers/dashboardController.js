const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        const incomeAggregation = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const expenseAggregation = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const currentTotalIncome = incomeAggregation[0]?.total || 0;
        const currentTotalExpenses = expenseAggregation[0]?.total || 0;
        const rawTotalBalance = currentTotalIncome - currentTotalExpenses;

        const finalTotalBalance = parseFloat(rawTotalBalance.toFixed(2));
        const finalTotalIncome = parseFloat(currentTotalIncome.toFixed(2));
        const finalTotalExpenses = parseFloat(currentTotalExpenses.toFixed(2));

        const endDate = new Date(); 

        // Definição da janela para rendas (últimos 60 dias)
        const startDateIncome = new Date();
        startDateIncome.setDate(endDate.getDate() - 60);

        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: startDateIncome, $lte: endDate }, // Filtro de data exato
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount, 0
        );
        
        const startDateExpense = new Date();
        startDateExpense.setDate(endDate.getDate() - 30);
        
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: startDateExpense, $lte: endDate },
        }).sort({ date: -1 });
        
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount, 0
        );

        const lastTransactions = [
            ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "expense",
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({
            totalBalance: finalTotalBalance,
            totalIncome: finalTotalIncome,
            totalExpenses: finalTotalExpenses,
            last30DaysExpenses: {
                total: parseFloat(expensesLast30Days.toFixed(2)),
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: parseFloat(incomeLast60Days.toFixed(2)),
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};