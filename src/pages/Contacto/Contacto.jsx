import React, { useState } from 'react';
import './Contacto.css';
import MainTitle from '../../components/Main-title/MainTitle';


export default function Contacto() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const nombre = formData.get("Nombre").trim();
        const mail = formData.get("Mail").trim();
        const mensaje = formData.get("Msj").trim();

        let newErrors = {};

        if (!/^[a-zA-ZÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÑñÇç' -]{4,100}$/.test(nombre)) {
            newErrors.nombre = "El nombre debe tener entre 4 y 100 caracteres y solo contener letras, espacios, apóstrofes o guiones.";
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(mail)) {
            newErrors.mail = "Ingrese un correo electrónico válido.";
        }
        if (mensaje.length < 20 || mensaje.length > 300) {
            newErrors.mensaje = "El mensaje debe tener entre 20 y 300 caracteres.";
        }
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombre, mail, mensaje }),
                });

                if (!response.ok) {
                    throw new Error("Error al enviar los datos");
                }

                alert("Formulario enviado correctamente");
                event.target.reset();
                setErrors({});

            } catch (error) {
                alert("Hubo un problema al enviar el formulario.");
                console.error(error);

            } finally {
                setIsLoading(false);
            }
            
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <main className="contacto">
            <MainTitle title="CONTACTANOS" />
            <div className="form">
                <form className="register-form" onSubmit={validateForm}>
                    <h2 className="form-title">Formulario de contacto</h2>

                    <div className="input-group">
                        <label htmlFor="Name">Nombre completo</label>
                        <input
                            id="Name"
                            name="Nombre"
                            placeholder="María Guadalupe Gonçalves"
                            required
                            type="text"
                        />
                        {errors.nombre && <p className="error">{errors.nombre}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="Correo">Correo electrónico</label>
                        <input
                            id="Correo"
                            name="Mail"
                            placeholder="guadalupe.goncalves@gmail.com"
                            required
                            type="email"
                        />
                        {errors.mail && <p className="error">{errors.mail}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="Mensaje">Mensaje</label>
                        <textarea
                            id="Mensaje"
                            name="Msj"
                            placeholder="Máximo 300 caracteres"
                            rows="10"
                            required
                        ></textarea>
                        {errors.mensaje && <p className="error">{errors.mensaje}</p>}
                    </div>

                    <div className="button3">
                        <button className="btn3" type="submit" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mapa">
                <iframe
                    allowFullScreen
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13137.379196667058!2d-58.54644161997964!3d-34.595441658247374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb786196b7715%3A0x6efee33dc71fd774!2sAlfonsina%20Storni%201721%2C%20B1676BNH%20Santos%20Lugares%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1729365538335!5m2!1ses-419!2sar"
                    style={{ border: "0" }}
                    width="600"
                />
            </div>
        </main>
    );
}
