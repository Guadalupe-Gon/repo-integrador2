import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import "./Header.css";
import React from 'react';
import { useOrder } from "../../Context/OrderContext";
import { useUser } from "../../Context/UserContext";


export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
    const handleBurgerClick = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }

    const { count, toggleCart } = useOrder()

    const { user, logout } = useUser();

    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

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
                        <NavLink className="nav-link" to="/Nosotros">
                            NOSOTROS
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="user-info">
                <div className="cart-container user-menu-toggle" onClick={toggleUserMenu}>
                    <FontAwesomeIcon icon={faUser} />
                    {showUserMenu && (
                        <div className="user-dropdown">
                            {!user && (
                                <NavLink to="/login" className="dropdown-item">
                                    LOGIN
                                </NavLink>
                            )}
                            {user?.role === "admin" && (
                                <NavLink className="dropdown-item" to="/AdminProd">
                                    PRODUCTOS
                                </NavLink>
                            )}
                            {user?.role === "admin" && (
                                <NavLink className="dropdown-item" to="/AdminUser">
                                    USUARIOS
                                </NavLink>
                            )}
                            {user && (
                                <NavLink to="/" className="dropdown-item" onClick={() => logout()}>
                                    LOGOUT
                                </NavLink>
                            )}
                        </div>
                    )}
                </div>

                <div className="cart-container" onClick={() => toggleCart()}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="cart-count">
                        {count}
                    </span>
                </div>
            </div>
        </header>
    )
}
