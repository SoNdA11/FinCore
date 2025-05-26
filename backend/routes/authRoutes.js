// Este arquivo define as rotas da API relacionadas à autenticação de usuários,
// incluindo registro, login, obtenção de informações do usuário e upload de imagem de perfil,
// e as associa aos seus respectivos controladores.

const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const { 
    registerUser,
    loginUser,
    getUserInfo 
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }
    
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    
    res.status(200).json({ imageUrl });
});

module.exports = router; 