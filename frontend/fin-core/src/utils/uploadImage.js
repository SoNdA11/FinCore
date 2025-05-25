import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Adicionar arquivo de imagem aos dados do formulário
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Definir cabeçalho para upload de arquivo
            },
        });
        return response.data; // Retornar dados da resposta
    } catch (error) {
        console.error('Error uploading the image:', error);
        throw error; // Relançar o erro para tratamento
    }
};

export default uploadImage;