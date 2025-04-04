import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let contador = 0;
        let totalAmount = 0;

        cart.forEach((item) => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
    
            contador += quantity;
            totalAmount += quantity * price;
        });

        setCount(contador);
        setTotal(totalAmount);
    }, [cart]);

    function toggleCart() {
        console.log("toggleCart clicked");
        setIsOpen(!isOpen);
    }

    function addProd(prod) {
        setCart((prevCart) => {
            const prodInCart = prevCart.find((item) => item.id === prod.id);

            if (prodInCart) {
                return prevCart.map((item) =>
                    item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...prod, quantity: 1 }];
            }
        });
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
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;