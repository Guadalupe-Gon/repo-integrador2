import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../Context/OrderContext';
import './DetalleProd.css';

const URL = "https://67d1918190e0670699baa003.mockapi.io";

export default function DetalleProd() {
    const { id } = useParams();
    const [product, setProductDetail] = useState({});
    const { addProd } = useOrder();

    useEffect(() => {
        async function getProductById() {
            try {
                const response = await axios.get(`${URL}/Productos/${id}`);
                setProductDetail(response.data);
            } catch (error) {
                console.warn(error);
            }
        }

        if (id) getProductById();
    }, [id]);

    const handleAddToCart = () => {
        if (product.id) {
            addProd({
                id: product.id,
                title: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
    };

    return (
        <section className="section-products">
            <div className="product-container">
                <article className="card">
                    <div className="card-content">
                        <img
                            alt={product.name || "Producto"}
                            className="card-image"
                            src={product.image || "/assets/images/placeholder.jpg"}
                        />
                    </div>
                    <div className="card-info">
                        <h3 className="card-title">{product.name || "Nombre del Producto"}</h3>
                        <p className="p">{product.descriptionShort || "Descripción del producto."}</p>
                        <div className="price-btn">
                            <div className="card-price">${product.price || "0,00"}</div>
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
                    <p>{product.descriptionDetailed || "Detalles no disponibles."}</p>
                </div>
            </div>
        </section>
    );
}
