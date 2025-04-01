import { createContext, useContext, useState } from "react";


const OrderContext = createContext()

export const useOrder = () => useContext(OrderContext)

function OrderProvider({ children }) {
    
    const [ isOpen, setIsOpen] = useState(false)
    const [ cart, setCart ] = useState([])

    function toggleCart() {
        console.log("toggleCart clicked")
        setIsOpen(!isOpen)
    }

    return (

        <OrderContext.Provider
            value={{
                cart,
                toggleCart,
                isOpen,
                
            }}>
            
            {children}
        </OrderContext.Provider>
    )

}

export default OrderProvider