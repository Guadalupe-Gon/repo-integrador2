import React from 'react';
import './Nosotros.css';
import MainTitle from '../../components/Main-title/MainTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';


export default function Nosotros() {

    return (
        <main className="nosotros">
            <MainTitle title="BAZAR BOUTIQUE" />
            <section className="empresa">
                <h2>Nuestra empresa</h2>
                <p>
                    Somos el Bazar Boutique #1 de Argentina. Fundado en el año 2012, contamos
                    con una gran variedad de artículos bajo el concepto de: simplicidad,
                    practicidad y belleza, que nos definen desde sus comienzos.
                    <br />
                    Con productos de diseño moderno, líneas puras e ilustraciones sencillas,
                    se puede encontrar vajilla de autor, utensilios y accesorios para la
                    cocina y el hogar. Nuestros clientes son fieles y eso nos desafía a
                    renovarnos constantemente con el afán de que quien regrese encuentre
                    siempre nuevas propuestas. Nuestro local está ubicado en Alfonsina Storni
                    1721, Santos Lugares, partido de Tres de Febrero (Gran Buenos Aires).
                </p>
                <div className="imgs">
                    <img alt="Logo empresa" className="log" src="/images/LOGO.png" />
                    <img
                        alt="Imagen de bazar"
                        className="bazar"
                        src="/images/BAZAR.jpg"
                    />
                </div>
            </section>
            <section className="staff">
                <h2>Nuestro staff</h2>
                <p>
                    Nuestro equipo está compuesto por profesionales dedicados, con una pasión
                    genuina por el orden y la practicidad en la cocina. Con una mezcla de
                    experiencia y creatividad, estamos comprometidos en brindar un servicio
                    excepcional a nuestros clientes. <br />
                    Cada miembro de nuestro equipo contribuye con sus habilidades únicas y su
                    dedicación, formando una sólida base de confianza y profesionalismo en
                    nuestro Bazar.
                </p>
                <h3>Integrantes del equipo</h3>
                <div className="guadalupe">
                    <img
                        alt="Img de María Guadalupe Gonçalves"
                        className="img-perfil"
                        src="/images/PERFIL.jpeg" />
                    <div className="card-content">
                        <h2 className="card-title">María Guadalupe Gonçalves</h2>
                        <p className="card-description">
                            34 años. Licenciada en Gestión del Arte y la Cultura. Programadora
                            Full-Stack en proceso.
                        </p>
                        <div className="icons">
                            <a className="icon" href="https://www.facebook.com" target="_blank">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </a>
                            <a className="icon" href="https://www.twitter.com" target="_blank">
                                <FontAwesomeIcon icon={faTwitterSquare} />
                            </a>
                            <a className="icon" href="https://www.instagram.com" target="_blank">
                                <FontAwesomeIcon icon={faInstagramSquare} />
                            </a>
                            <a className="icon" href="https://www.linkedin.com" target="_blank">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
