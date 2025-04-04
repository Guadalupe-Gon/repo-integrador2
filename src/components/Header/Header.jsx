import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import "./Header.css";
import React from 'react';
import { useOrder } from "../../Context/OrderContext";

export default function Header() {

    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
    const handleBurgerClick = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }

    const { count, toggleCart } = useOrder()

    return (
        <header className="main-header">

            <input
                type="checkbox"
                id="burger"
                className="input-burger"
                checked={isBurgerOpen}
                onChange={handleBurgerClick} />
            <label className="burger-container" htmlFor="burger">
                <div className="burger"></div>
            </label>

            <div class="logo">
                <a href="/">
                    <img src="/images/LOGO.png" className="nav-logo" alt="Logo empresa" />
                </a>
            </div>

            <nav className="main-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            PRINCIPAL
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Registro">
                            REGISTRO
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Contacto">
                            CONTACTO
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/AdminProd">
                            PRODUCTOS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/AdminUser">
                            USUARIOS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Nosotros">
                            NOSOTROS
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="user-info">
                <div className="cart-container">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="cart-container" onClick={ () => toggleCart() }>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="cart-count">
                        { count }
                    </span>
                </div>
            </div>
        </header>
    )
}