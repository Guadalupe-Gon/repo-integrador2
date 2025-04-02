import { useOrder } from "../../../Context/OrderContext";

export default function Card({ id, name, price, description, image }) {
    const { addProd } = useOrder();

    const handleOnDetailsClick = () => {
        window.location.href = `/DetalleProd/${id}`;
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
                    src={image} />

                <button
                    className="card-add"
                    title="Añadir al carrito"
                    onClick={handleAddToCart}>
                    Agregar al carrito
                </button>
            </div>
            <div className="card-info">
                <h3 className="card-title">{name}</h3>
                <div className="p">
                    {description}
                </div>
                <div className="price-btn">
                    <div className="card-price">{`$${price}`}</div>
                    <div className="btn">
                        <a className="btn2" href="#" onClick={handleOnDetailsClick}>
                            Ver más
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}