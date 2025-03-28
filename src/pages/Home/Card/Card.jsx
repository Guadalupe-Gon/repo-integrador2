export default function Card({ id, name, price, description, image, cart, setCart }) {

    const handleOnDetailsClick = () => {
        window.location.href = `/DetalleProd/${id}`;
    };

    const handleAddToCart = () => {
        if (cart.some(item => item.id === id)) {
            setCart((prevCart) =>
                prevCart.map(item =>
                    item.id === id ? { ...item, cantity: item.cantity + 1 } : item
                )
            );
        } else {
            setCart((prevCart) => {
                cart
                return [...prevCart, { id, name, price, cantity: 1 }];
            });
        }
    }

    return (
        <article className="card">
            <div className="card-content">
                <img
                    alt={name}
                    className="card-image"
                    src={image}/>
            
                <button className="card-add" onClick={handleAddToCart}>
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