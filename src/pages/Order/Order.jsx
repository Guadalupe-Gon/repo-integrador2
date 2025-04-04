import { useOrder } from "../../Context/OrderContext";
import "./Order.css";
import React from "react";

export default function Order() {

    const { cart, total, finalizarOrden, limpiarCarrito } = useOrder()

    return (
        <>
            <div className="order-container">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.quantity * product.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>TOTAL $ {total}</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="order-buttons">
                <button className="button" onClick={finalizarOrden}>Finalizar compra</button>
                <button className="button" onClick={limpiarCarrito}>Vaciar carrito</button>
                </div>
            </div>
        </>
    )
}