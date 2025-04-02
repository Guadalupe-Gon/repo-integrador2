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
        let total = 0;

        cart.forEach((item) => {
            contador += item.quantity;
            total += item.quantity * item.price;
        });

        setCount(contador);
        setTotal(total);
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




    //FUNCIONES PARA CAMBIAR CANTIDADES Y ELIMINAR DEL CARRITO CON + Y -





    return (
        <OrderContext.Provider
            value={{
                cart,
                toggleCart,
                isOpen,
                addProd,
                count,
                total,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;