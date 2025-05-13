import { faSquarePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './AdminProd.css';
import MainTitle from '../../components/Main-title/MainTitle';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;


export default function AdminProd() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', descriptionShort: '', descriptionDetailed: '', image: '', createdAt: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await axios.get(`${URL}/products`);
            const productos = response.data.products;

            setProducts(productos);
        } catch (error) {
            console.warn(error);
        }
    }

    async function handleAddOrUpdateProduct(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('descriptionShort', form.descriptionShort);
        formData.append('descriptionDetailed', form.descriptionDetailed);
        formData.append('createdAt', form.createdAt);

        if (form.image?.length) {
            formData.append('image', form.image[0]);
        }

        try {
            if (editingProduct) {
                await axios.put(`${URL}/${editingProduct._id}`, formData);
                alert('Producto actualizado con éxito');
            } else {
                await axios.post(URL, formData);
                alert('Producto agregado con éxito');
            }

            setForm({ name: '', price: '', descriptionShort: '', descriptionDetailed: '', image: '', createdAt: '' });
            setEditingProduct(null);
            getProducts();

        } catch (error) {
            console.log(error);
            alert('Error al procesar el producto');
        }
    }

    async function handleDeleteProduct(_id) {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            try {
                await axios.delete(`${URL}/${_id}`);
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
        const { name, value, files } = e.target;

        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
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
                            <tr key={product._id}>
                                <td className="image-cell">
                                    <img alt={product.name}
                                        className="table-image"
                                        src={`${import.meta.env.VITE_FILES_URL}/products/${product.image}`} />
                                </td>
                                <td className="product-cell">{product.name}</td>
                                <td className="description-cell">{product.descriptionShort}</td>
                                <td className="price-cell">{product.price.toLocaleString("es-AR",
                                    {
                                        style: "currency",
                                        currency: "ARS",
                                    })}</td>
                                <td className="tools-cell">
                                    <div className="icon-container">
                                        <button className="btn" title="Editar" onClick={() => handleEditProduct(product)}>
                                            <FontAwesomeIcon icon={faSquarePen} />
                                        </button>
                                        <button className="btn" title="Eliminar" onClick={() => handleDeleteProduct(product._id)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <MainTitle title="Tabla de acciones" />

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
                    type='file'
                    accept='image/*'
                    name='image'
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