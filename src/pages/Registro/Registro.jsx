import React from 'react';
import './Registro.css';
import MainTitle from '../../components/Main-title/MainTitle';
import { useState } from "react";
import axios from 'axios';

export default function Registro() {
    
    const [formData, setFormData] = useState({
        Nombre: "",
        Mail: "",
        Contraseña: "",
        RepetirContraseña: "",
        FechaNacimiento: "",
        Provincia: "",
        Imagen: null,
        Observaciones: ""
        // isAdmin: false,
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};

        if (!formData.Nombre.match(/^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÇçÑñŃń' -]+$/)) {
            tempErrors.Nombre = "El nombre solo debe contener letras, espacios, apóstrofes y guiones.";
        }

        if (!formData.Mail.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
            tempErrors.Mail = "Correo electrónico no válido.";
        }

        if (formData.Contraseña.length < 4 || formData.Contraseña.length > 10) {
            tempErrors.Contraseña = "La contraseña debe tener entre 4 y 10 caracteres.";
        }

        if (formData.Contraseña !== formData.RepetirContraseña) {
            tempErrors.RepetirContraseña = "Las contraseñas no coinciden.";
        }

        if (!formData.FechaNacimiento) {
            tempErrors.FechaNacimiento = "Seleccione una fecha de nacimiento.";
        }

        if (!formData.Provincia) {
            tempErrors.Provincia = "Seleccione una provincia.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post("https://67d1918190e0670699baa003.mockapi.io/Usuarios", formData);
                console.log("Usuario registrado:", response.data);
                alert("Usuario registrado con éxito.");
            } catch (error) {
                console.error("Error al registrar usuario:", error);
                alert("Hubo un error al registrar el usuario.");
            }
        } else {
            alert("Corrige los errores antes de enviar.");
        }
    };

    return (
        <main className="main-container">
            <MainTitle title="FORMULARIO DE REGISTRO" />
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="Name">
                            Nombre completo
                        </label>
                        <input
                            id="Name"
                            name="Nombre"
                            value={formData.Nombre}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder='María Guadalupe Gonçalves' />
                        {errors.Nombre && <p className="error">{errors.Nombre}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="Correo">
                            Correo electrónico
                        </label>
                        <input
                            id="Correo"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            placeholder='guadalupe.goncalves@gmail.com' />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="Pass"
                            name="password"
                            value={formData.Contraseña}
                            onChange={handleChange}
                            required
                            type="password"
                            placeholder='****' />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="RepetirPass">
                            Repetir contraseña
                        </label>
                        <input
                            id="RepetirPass"
                            name="RepetirContraseña"
                            value={formData.RepetirContraseña}
                            onChange={handleChange}
                            required
                            type="password"
                            placeholder='****' />
                        {errors.RepetirContraseña && <p className="error">{errors.RepetirContraseña}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="Nac">
                            Fecha de nacimiento
                        </label>
                        <input
                            id="Nac"
                            name="FechaNacimiento"
                            value={formData.FechaNacimiento}
                            onChange={handleChange}
                            required
                            type="date" />
                        {errors.FechaNacimiento && <p className="error">{errors.FechaNacimiento}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="Provincia">
                            Seleccione su provincia
                        </label>
                        <select
                            id="Provincia"
                            name="Provincia"
                            value={formData.Provincia}
                            onChange={handleChange}
                            required>
                            <option value="">Seleccione...</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquén">Neuquén</option>
                            <option value="Río Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luis">San Luis</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierr del Fuego">Tierra del Fuego</option>
                            <option value="Tucumán">Tucumán</option>
                        </select>
                        {errors.Provincia && <p className="error">{errors.Provincia}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="Obs">
                            Observaciones
                        </label>
                        <textarea
                            id="Obs"
                            name="Observaciones"
                            value={formData.Observaciones}
                            onChange={handleChange}
                            maxLength="200"
                            rows="4"
                            placeholder="Máximo 200 caracteres">
                        </textarea>
                    </div>
                    <div className="button">
                        <button className="btn" type="submit">
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}