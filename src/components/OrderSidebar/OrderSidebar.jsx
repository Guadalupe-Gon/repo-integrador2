import { useOrder } from "../../Context/OrderContext";
import Order from "../../pages/Order/Order";
import "./OrderSidebar.css";

export default function OrderSidebar() {

    const { isOpen } = useOrder() 

    return (
        <div className={`order-sidebar ${isOpen ? "active" : ""}`}>
            <Order />
        </div>
    )
};