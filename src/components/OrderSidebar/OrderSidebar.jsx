import { useOrder } from "../../Context/OrderContext";
import Order from "../../pages/Order/Order";
import "./OrderSidebar.css";

export default function OrderSidebar() {
    const { isOpen, cart, total, count } = useOrder();

    return (
        <div className={`order-sidebar ${isOpen ? "active" : ""}`}>
            <Order cart={cart} total={total} count={count} />
        </div>
    );
}