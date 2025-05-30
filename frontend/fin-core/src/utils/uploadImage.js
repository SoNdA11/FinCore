// Este arquivo contém uma função utilitária assíncrona para fazer o upload de arquivos de imagem para o backend.
// Ele utiliza FormData para enviar os dados da imagem.

import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading the image:', error);
        throw error;
    }
};

export default uploadImage;