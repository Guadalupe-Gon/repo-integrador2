import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import "./Header.css";
import React from 'react';

export default function Header() {

    return (
        <header className="main-header">

            <div class="logo">
                <a href="">
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
                            ADM. DE PRODUCTOS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/AdminUser">
                            ADM. DE USUARIOS
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
                <div className="cart-container">
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
            </div>
        </header>
    )
}