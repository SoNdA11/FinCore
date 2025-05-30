// Este arquivo contém a lógica de controle para operações de autenticação de usuários,
// incluindo registro, login e obtenção de informações do usuário, utilizando JWT para autenticação.

const User = require('../models/User')
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validação: verificar campos ausentes
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        // Verificar se o e-mail já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já está em uso" });
        }

        // Criar o usuário
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Erro ao registrar o usuário", error: err.message })
    }

};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error ao registrar usuário", error: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Erro ao cadastrar o usuário", error: err.message });
    }
};