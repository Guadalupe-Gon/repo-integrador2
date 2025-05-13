import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../Context/OrderContext';
import './DetalleProd.css';

const URL = import.meta.env.VITE_API_URL;
const FILES_URL = import.meta.env.VITE_FILES_URL;


export default function DetalleProd() {
    const { id } = useParams();
    const [product, setProductDetail] = useState(null);
    const { addProd } = useOrder();

    useEffect(() => {
        async function getProductById() {
            try {
                const response = await axios.get(`${URL}/products/${id}`);
                setProductDetail(response.data.product);
            } catch (error) {
                console.warn("Error al obtener el producto:", error);
            }
        }

        if (id) getProductById();
    }, [id]);

    const handleAddToCart = () => {
        if (product?._id) {
            addProd({
                id: product._id,
                title: product.name,
                price: product.price,
                quantity: 1,
                image: `${FILES_URL}/products/${product.image}`
            });
        }
    };

    if (!product) {
        return <p className="loading">Cargando producto...</p>;
    }

    return (
        <section className="section-products">
            <div className="product-container">
                <article className="card">
                    <div className="card-content">
                        <img
                            alt={product.name}
                            className="card-image"
                            src={`${FILES_URL}/products/${product.image}`}
                        />
                    </div>
                    <div className="card-info">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="p">{product.descriptionShort}</p>
                        <div className="price-btn">
                            <div className="card-price">
                                {Number(product.price).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                            </div>
                            <div className="btn">
                                <button className="btn2" onClick={handleAddToCart}>
                                    AGREGAR AL CARRITO
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="description">
                    <div className="subtitle">Descripción detallada del producto</div>
                    <p>{product.descriptionDetailed}</p>
                </div>
            </div>
        </section>
    );
}

