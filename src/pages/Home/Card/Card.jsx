import { useOrder } from "../../../Context/OrderContext";
import { useNavigate } from "react-router-dom";


export default function Card({ id, name, price, description, image }) {
    const { addProd } = useOrder();
    const navigate = useNavigate();

    const handleOnDetailsClick = (e) => {
        e.preventDefault();
        navigate(`/DetalleProd/${id}`);
    };

    const handleAddToCart = () => {
        const product = {
            id,
            title: name,
            price,
            quantity: 1,
            image
        };
        addProd(product);
    };

    return (
        <article className="card">
            <div className="card-content">
                <img
                    alt={name}
                    className="card-image"
                    src={image}
                />
                <button
                    className="card-add"
                    title="Añadir al carrito"
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                </button>
            </div>

            <div className="card-info">
                <h3 className="card-title">{name}</h3>
                <div className="p">{description}</div>
                <div className="price-btn">
                    <div className="card-price">{`${price}`}</div>
                    <div className="btn">
                        <button className="btn2" onClick={handleOnDetailsClick}>
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
