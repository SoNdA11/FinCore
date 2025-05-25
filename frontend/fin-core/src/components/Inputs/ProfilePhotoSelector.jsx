import React, { useRef, useState, useEffect } from 'react'; // Importe useEffect
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// Prop `existingImageUrl` será o `user?.profileImageUrl` que vem do UserContext
// Prop `onImageSelect` será a função para passar o File para o componente pai (SignUp)
const ProfilePhotoSelector = ({ existingImageUrl, onImageSelect }) => {
    const inputRef = useRef(null);
    // previewUrl agora gerenciará tanto o blob temporário quanto o URL existente
    const [previewUrl, setPreviewUrl] = useState(existingImageUrl || null);

    // Efeito para atualizar a prévia se existingImageUrl mudar (ex: login de outro user)
    useEffect(() => {
        setPreviewUrl(existingImageUrl);
    }, [existingImageUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Passe o File para a função de callback no componente pai
            onImageSelect(file);

            // Gere preview URL temporário para exibição imediata
            const tempPreview = URL.createObjectURL(file);
            setPreviewUrl(tempPreview);
        }
    };

    const handleRemoveImage = () => {
        // Informe o componente pai que a imagem foi removida (passando null)
        onImageSelect(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = ''; // Limpa o input file
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!previewUrl ? ( // Use previewUrl para decidir se exibe o placeholder ou a imagem
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative ">
                    <LuUser className="text-4xl text-primary" />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                        title="Upload Profile Photo"
                    >
                        <LuUpload className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl} // Use previewUrl aqui
                        alt="profile photo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                        title="Remove Profile Photo"
                    >
                        <LuTrash className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;