// Este arquivo configura o middleware Multer para o upload de arquivos,
// especificamente imagens de perfil, definindo o destino e o nome do arquivo,
// além de filtrar os tipos de arquivo permitidos.

const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['images/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Apenas .jpeg, .jpg e .png são formatos permitidos'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
