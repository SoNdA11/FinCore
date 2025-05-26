// Este componente React permite ao usuário selecionar, pré-visualizar,
// fazer upload e remover sua imagem de perfil.

import React, { useRef, useState, useEffect } from 'react'; 
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ existingImageUrl, onImageSelect }) => {

    const inputRef = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(existingImageUrl || null);

    useEffect(() => {
        setPreviewUrl(existingImageUrl);
    }, [existingImageUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            onImageSelect(file);

            const tempPreview = URL.createObjectURL(file);
            setPreviewUrl(tempPreview);
        }
    };

    const handleRemoveImage = () => {

        onImageSelect(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = '';
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

            {!previewUrl ? (
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
                        src={previewUrl}
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