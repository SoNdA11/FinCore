// Este arquivo contém o middleware de autenticação que verifica e decodifica tokens JWT
// para proteger rotas da API, garantindo que apenas usuários autenticados possam acessá-las.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Não autorizado, token ausente" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ messsage: "Não autorizado, token ausente" });
    }

}