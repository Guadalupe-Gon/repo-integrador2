import React from 'react';
import './Login.css';
import MainTitle from '../../components/Main-title/MainTitle';
import { useForm } from "react-hook-form";
import { useUser } from '../../context/UserContext';


export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const { login } = useUser();

    return (
        <main className="main-container">
            <MainTitle title="INICIAR SESIÓN" />
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit(async (data) => {
                    try {
                        await login(data);
                    } catch (error) {
                        console.error("Error en login:", error);
                    }
                })}>

                    <div className="input-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="test@gmail.com"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Formato de correo inválido",
                                },
                            })}
                        />
                        {errors.email && <p className="input-error">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            placeholder="****"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 4,
                                    message: "La contraseña debe tener al menos 4 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "La contraseña no debe exceder los 20 caracteres"
                                },
                            })}
                        />
                        {errors.password && <p className="input-error">{errors.password.message}</p>}
                    </div>


                    <div className="btn">
                        <button type="submit" className="btn-submit" disabled={!isValid}>
                            LOGIN
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}
