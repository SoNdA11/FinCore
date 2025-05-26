// Este arquivo define as rotas da API para gerenciar as rendas do usuário,
// incluindo adicionar, obter, excluir e fazer download, todas protegidas por autenticação.

const express = require("express");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;