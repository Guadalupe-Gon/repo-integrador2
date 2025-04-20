import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart.length === 0) {
            localStorage.removeItem("cart");
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
        if (cartLocalStorage) {
            setCart(cartLocalStorage);
        }
    }, []);

    useEffect(() => {
        let contador = 0;
        let total = 0;

        cart.forEach((item) => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;

            contador += quantity;
            total += quantity * price;
        });

        setCount(contador);
        setTotal(total);
    }, [cart]);

    function toggleCart() {
        setIsOpen(!isOpen);
    }

    function addProd(prod) {
        let priceNumber = prod.price;

        if (typeof priceNumber === "string") {
            priceNumber = priceNumber.replace(/\./g, "");
            priceNumber = priceNumber.replace(",", ".");
            priceNumber = parseFloat(priceNumber);
        }

        setCart((prevCart) => {
            const prodInCart = prevCart.find((item) => item.id === prod.id);

            if (prodInCart) {
                return prevCart.map((item) =>
                    item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...prod, quantity: 1, price: priceNumber }];
            }
        });
    }

    function aumentarCantidad(id) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function disminuirCantidad(id) {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0) // elimina el producto si la cantidad es 0
        );
    }

    function eliminarProducto(id) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    }



    const limpiarCarrito = () => {
        setCart([]);
    };

    const finalizarOrden = () => {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        alert("Compra finalizada con éxito.");
        setCart([]);
    };



    return (
        <OrderContext.Provider
            value={{
                cart,
                toggleCart,
                isOpen,
                addProd,
                count,
                total,
                limpiarCarrito,
                finalizarOrden,
                aumentarCantidad,
                disminuirCantidad,
                eliminarProducto,
            }}
        >

            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;