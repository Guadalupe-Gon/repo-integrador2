import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram, faFacebook, faTiktok, faYoutube, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faArrowsRotate, faBagShopping, faCircleQuestion, faEnvelope, faLocationDot, faPhone, faShop } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import React from 'react';

export default function Footer() {

    return (

        <footer className="main-footer">

            <section className="footer-social">
                <div className="f-social">Redes sociales</div>
                <div className="icon-social">
                    <div className="icon-ig">
                        <FontAwesomeIcon icon={faSquareInstagram} />
                        <p>Instagram</p>
                    </div>
                    <div className="icon-fb">
                        <FontAwesomeIcon icon={faFacebook} />
                        <p>Facebook</p>
                    </div>
                    <div className="icon-tt">
                        <FontAwesomeIcon icon={faTiktok} />
                        <p>Tik Tok</p>
                    </div>
                    <div className="icon-yt">
                        <FontAwesomeIcon icon={faYoutube} />
                        <p>YouTube</p>
                    </div>
                </div>
            </section>

            <section className="footer-info">
                <div className="f-info">Información</div>
                <div className="compras">
                    <FontAwesomeIcon icon={faBagShopping} />
                    <p>Compras</p>
                </div>
                <div className="preguntas">
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    <p>Preguntas frecuentes</p>
                </div>
                <div className="cambios">
                    <FontAwesomeIcon icon={faArrowsRotate} />
                    <p>Políticas de cambios y devoluciones</p>
                </div>
                <div className="mayor">
                    <FontAwesomeIcon icon={faShop} />
                    <p>Compra mayorista</p>
                </div>
            </section>

            <section className="footer-contact">
                <div className="f-contact">Contacto</div>
                <div className="adress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>Alfonsina Storni 1721, Tres de Febrero </p>
                </div>
                <div className="mail">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>guadalupe.goncalves@gmail.com</p>
                </div>
                <div className="telefono">
                    <FontAwesomeIcon icon={faPhone} />
                    <p>(011) 4755-7546</p>
                </div>
                <div className="wp">
                    <FontAwesomeIcon icon={faSquareWhatsapp} />
                    <p>(011) 15-5001-4725</p>
                </div>
            </section>

            <div className="logo2">
                <a href="/">
                    <img alt="LOGO" className="logo2" src="/images/LOGO.png" />
                </a>
            </div>

        </footer>

    )
}
