// frontend/fin-core/src/pages/Auth/SignUp.jsx

import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setError(null);

        if (!fullName) {
            setError("Por favor, digite seu nome completo.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Por favor, digite um e-mail válido.");
            return;
        }
        if (!password) {
            setError("Por favor, digite a senha.");
            return;
        }
        if (password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("A senha deve conter pelo menos uma letra maiúscula.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("A senha deve conter pelo menos uma letra minúscula.");
            return;
        }
        if (!/[0-9]/.test(password)) {
            setError("A senha deve conter pelo menos um número.");
            return;
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            setError("A senha deve conter pelo menos um caractere especial.");
            return;
        }

        try {
            if (profilePicFile) {
                const imgUploadRes = await uploadImage(profilePicFile);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Algo deu errado. Por favor, tente novamente.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-o flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Criar uma conta</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Junte-se a nós hoje mesmo inserindo seus dados abaixo.
                </p>
                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector onImageSelect={setProfilePicFile} />

                    {/* Alteração aqui! O div agora não é mais um grid */}
                    <div className="flex flex-col gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Nome"
                            placeholder="Paulo"
                            type="text"
                        />
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Endereço de E-mail"
                            placeholder="paulo@exemplo.com"
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Senha"
                            placeholder="Mínimo de 8 caracteres, com maiúscula, minúscula, número e especial"
                            type="password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        Cadastrar-se
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Já tem uma conta?{" "}
                        <Link className="font medium text-primary underline" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;