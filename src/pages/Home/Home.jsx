import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainTitle from "../../components/Main-title/MainTitle";
import "./Banner.css";
import "./Caracteristicas.css";
import "./Card/Card.css"
import { faSackDollar } from "@fortawesome/free-solid-svg-icons/faSackDollar";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons/faBuildingUser";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";

const URL = "https://67d1918190e0670699baa003.mockapi.io"


export default function Home() {
    const [products, setProducts] = useState([])

    async function getProducts() {
        try {
            const response = await axios.get(`${URL}/Productos`);
            console.log(response.data)
            setProducts(response.data)
        }
        catch (error) {
            console.warn(error)
        }
    }

    console.log("PRODUCTS list", products);

    useEffect(() => {
        getProducts()
    }
        , [])

    return (
        <div>
            <section className="section-banner">
                <div className="slider">
                    <input id="slide-1" name="slider" type="radio" defaultChecked />
                    <input id="slide-2" name="slider" type="radio" />
                    <input id="slide-3" name="slider" type="radio" />

                    <div className="slider-buttons">
                        <label htmlFor="slide-1"></label>
                        <label htmlFor="slide-2"></label>
                        <label htmlFor="slide-3"></label>
                    </div>

                    <div className="slider-content">
                        <div className="slide slide-1">
                            <img alt="banner-1" src="public/images/BANNER1.jpg" />
                        </div>
                        <div className="slide slide-2">
                            <img alt="banner-2" src="public/images/BANNER2.jpg" />
                        </div>
                        <div className="slide slide-3">
                            <img alt="banner-3" src="public/images/BANNER3.jpg" />
                        </div>
                    </div>
                </div>
            </section>

            <main className="main-container">
                <MainTitle title="CONOCÉ NUESTROS PRODUCTOS" />
                <section className="section-products">

                    <div className="product-container">
                        {products.map((product) => {
                            return (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    description={product.descriptionShort}
                                    image={product.image}
                                />
                            )
                        })}

                    </div>
                </section>

                <section className="caract">
                    <div className="caract-1">
                        <FontAwesomeIcon icon={faSackDollar} />
                        <p>Todos los medios de pago</p>
                    </div>
                    <div className="caract-2">
                        <FontAwesomeIcon icon={faBuildingUser} />
                        <p>Retiro por local</p>
                    </div>
                    <div className="caract-3 icono">
                        <FontAwesomeIcon icon={faTruck} />
                        <p>Envíos en el día a CABA y GBA</p>
                    </div>
                    <div className="caract-4 icono">
                        <FontAwesomeIcon icon={faTruckFast} />
                        <p>Envíos a todo el país</p>
                    </div>
                </section>
            </main>
        </div>
    )
}