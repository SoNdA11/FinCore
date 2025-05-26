// Este arquivo configura e estabelece a conexão com o banco de dados MongoDB usando Mongoose.
// Ele contém a lógica para conectar ao MongoDB e gerenciar erros de conexão.

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectDB;