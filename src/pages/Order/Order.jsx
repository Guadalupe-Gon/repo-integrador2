import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../Context/OrderContext";
import "./Order.css";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function formatPrice(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(value);
}

export default function Order() {

    const { cart, total, finalizarOrden, limpiarCarrito, disminuirCantidad, aumentarCantidad, eliminarProducto } = useOrder()

    return (
        <>
            <div className="order-container">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="order-product-image"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>
                                    <div className="quantity-controls">
                                        <button onClick={() => disminuirCantidad(product.id)}><FontAwesomeIcon icon={faSquareMinus} /></button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => aumentarCantidad(product.id)}><FontAwesomeIcon icon={faSquarePlus} /></button>
                                        <button className="delete" onClick={() => eliminarProducto(product.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </td>
                                <td>{formatPrice(product.quantity * product.price)}</td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={6}>Subtotal: {formatPrice(total)}</td>
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