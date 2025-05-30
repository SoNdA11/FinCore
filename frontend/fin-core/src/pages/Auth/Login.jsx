// Este componente React implementa a página de login do usuário,
// permitindo que eles insiram suas credenciais para acessar o aplicativo.

import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Por favor, informe um e-mail válido.");
            return;
        }

        if (!password) { // Já existe
            setError("Por favor, digite a senha.");
            return;
        }

        if (password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres."); 
            return;
        }

        setError("");

        // Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
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
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Que bom ter você aqui!</h3>
                <p className="text-xs text-state-700 mt-[5px] mb-6">
                    Preencha seus dados para fazer login
                </p>

                <form onSubmit={handleLogin}>
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
                        placeholder="Mínimo de 8 caracteres"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        Entrar
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Não tem uma conta?{" "}
                        <Link className="font medium text-primary underline" to="/signup">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
};

export default Login