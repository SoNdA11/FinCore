// Este arquivo define as rotas da API para obter dados do dashboard financeiro do usuário,
// protegidas por autenticação.

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;