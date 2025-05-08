import { faSquarePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './AdminProd.css';
import MainTitle from '../../components/Main-title/MainTitle';
import axios from 'axios';

const URL = "https://67d1918190e0670699baa003.mockapi.io/Productos";

export default function AdminProd() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', descriptionShort: '', image: '', createdAt: '', category: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    async function getProducts() {
        try {
            const response = await axios.get(URL);
            setProducts(response.data);
        } catch (error) {
            console.warn(error);
        }

        // AGREGAR ACÁ LO DE FORM DATA 
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function handleAddOrUpdateProduct(e) {
        e.preventDefault();
        try {
            if (editingProduct) {
                await axios.put(`${URL}/${editingProduct.id}`, form);
                alert('Producto actualizado con éxito');
            } else {
                await axios.post(URL, form);
                alert('Producto agregado con éxito');
            }
            setForm({ name: '', price: '', descriptionShort: '', image: '', createdAt: '', category: '' });
            setEditingProduct(null);
            getProducts();
        } catch (error) {
            console.log(error)
            alert('Error al procesar el producto');
        }
    }

    async function handleDeleteProduct(id) {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            try {
                await axios.delete(`${URL}/${id}`);
                alert('Producto eliminado con éxito');
                getProducts();
            } catch (error) {
                console.log(error)
                alert('Error al eliminar el producto');
            }
        }
    }

    function handleEditProduct(product) {
        setForm(product);
        setEditingProduct(product);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <main className='admin-container'>

            <MainTitle title="ADMINISTRADOR DE PRODUCTOS" />

            <div className="table-responsive">
                <table className="admin-products">
                    <thead>
                        <tr className="title">
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="image-cell">
                                    <img alt={product.name} className="table-image" src={product.image} />
                                </td>
                                <td className="product-cell">{product.name}</td>
                                <td className="description-cell">{product.descriptionShort}</td>
                                <td className="price-cell">${product.price}</td>
                                <td className="tools-cell">
                                    <div className="icon-container">
                                        <button className="btn" title="Editar" onClick={() => handleEditProduct(product)}>
                                            <FontAwesomeIcon icon={faSquarePen} />
                                        </button>
                                        <button className="btn" title="Eliminar" onClick={() => handleDeleteProduct(product.id)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <MainTitle title="Tabla de acciones"/>
            
            <form className='product-form' onSubmit={handleAddOrUpdateProduct}>
                <input
                    type='text'
                    name='name'
                    placeholder='Nombre del producto'
                    value={form.name}
                    onChange={handleChange}
                    required />
                <input
                    type='number'
                    name='price'
                    placeholder='Precio'
                    value={form.price}
                    onChange={handleChange}
                    required />
                <textarea
                    name='descriptionShort'
                    placeholder='Descripción'
                    value={form.descriptionShort}
                    onChange={handleChange}
                    required>
                </textarea>
                <input
                    type='url'
                    name='image'
                    placeholder='URL de la imagen'
                    value={form.image}
                    onChange={handleChange}
                    required />
                <input
                    type='date'
                    name='createdAt'
                    value={form.createdAt}
                    onChange={handleChange}
                    required />
                <button
                    type='submit'>{editingProduct ? 'Editar' : 'Agregar'} producto
                </button>
            </form>
        </main>
    );
}