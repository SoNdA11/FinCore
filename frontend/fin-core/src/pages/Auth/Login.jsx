import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
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
        if (!password) {
            setError("Por favor, digite a senha.");
            return;
        }
        if (password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres.");
            return;
        }
        setError("");
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
    };

    return (
        <AuthLayout>
            <div className="auth-form-panel"> 
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Seja Bem-vindo(a)!</h3>
                <p className="text-sm text-gray-500 mb-8">
                    Preencha seus dados para fazer login e controlar suas finanças.
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Endereço de E-mail"
                        placeholder="seuemail@exemplo.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Senha"
                        placeholder="Mínimo de 8 caracteres"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-xs mt-1 mb-3 text-center">{error}</p>}

                    <button type="submit" className="btn-primary mt-4">
                        Entrar
                    </button>

                    <p className="text-sm text-gray-600 mt-8 text-center">
                        Não tem uma conta?{" "}
                        <Link className="font-semibold text-primary hover:text-primary-dark hover:underline" to="/signup">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;