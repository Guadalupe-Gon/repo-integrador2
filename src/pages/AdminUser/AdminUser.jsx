import { faSquarePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import MainTitle from '../../components/Main-title/MainTitle';
import axios from 'axios';
import './AdminUser.css';

const URL = "https://67d1918190e0670699baa003.mockapi.io/Usuarios";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', date: '', province: '' });
    const [editingUser, setEditingUser] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get(URL);
            console.log("Usuarios obtenidos desde la API:", response.data);
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("La API no devolvió un array:", response.data);
                setUsers([]);
            }
        } catch (error) {
            console.warn("Error al obtener los usuarios:", error);
            alert("Error al obtener los usuarios.");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    const handleAddOrUpdateUser = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.date || !form.province) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        try {
            if (editingUser) {
                await axios.put(`${URL}/${editingUser.id}`, form);
                alert('Usuario actualizado con éxito');
            } else {
                await axios.post(URL, form);
                alert('Usuario agregado con éxito');
            }
            setForm({ name: '', email: '', date: '', province: '' });
            setEditingUser(null);

            console.log("Actualizando lista de usuarios...");
            await getUsers();
        } catch (error) {
            console.log("Error al procesar el usuario:", error);
            alert('Error al procesar el usuario');
        }
    };


    const handleDeleteUser = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
            try {
                await axios.delete(`${URL}/${id}`);
                alert('Usuario eliminado con éxito');
                getUsers();
            } catch (error) {
                console.log("Error al eliminar el usuario:", error);
                alert('Error al eliminar el usuario');
            }
        }
    };

    const handleEditUser = (user) => {
        setForm({
            name: user.name || '',
            email: user.email || '',
            date: user.date || '',
            province: user.province || ''
        });
        setEditingUser(user);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    return (
        <main className='admin-container'>
            <MainTitle title="ADMINISTRADOR DE USUARIOS" />
            <div className="table-responsive">
                <table className="admin-users">
                    <thead>
                        <tr className="title">
                            <th>Nombre</th>
                            <th>E-mail</th>
                            <th>Fecha de nacimiento</th>
                            <th>Provincia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.date}</td>
                                    <td>{user.province}</td>
                                    <td className="tools-cell">
                                        <div className="icon-container">
                                            <button className="btn" title="Editar" onClick={() => handleEditUser(user)}>
                                                <FontAwesomeIcon icon={faSquarePen} />
                                            </button>
                                            <button className="btn" title="Eliminar" onClick={() => handleDeleteUser(user.id)}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay usuarios registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <MainTitle title="Formulario de usuario" />

            <form className='user-form' onSubmit={handleAddOrUpdateUser}>
                <input
                    type='text'
                    name='name'
                    placeholder='Nombre y apellido'
                    value={form.name}
                    onChange={handleChange}
                    required />
                <input
                    type='email'
                    name='email'
                    placeholder='Correo electrónico'
                    value={form.email}
                    onChange={handleChange}
                    required />
                <input
                    type='date'
                    name='date'
                    placeholder='Fecha de nacimiento'
                    value={form.date}
                    onChange={handleChange}
                    required />

                <input
                    type='text'
                    name='province'
                    placeholder='Provincia'
                    value={form.province}
                    onChange={handleChange}
                    required />

                <button type='submit'>{editingUser ? 'Editar' : 'Agregar'} usuario</button>
            </form>
        </main>
    );
}