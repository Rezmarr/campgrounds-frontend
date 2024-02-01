import { Link, useNavigate } from "react-router-dom";
import "./bookDetails.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function BookDetails() {

    const navigate = useNavigate();

    return (
        <div className='bookDetails'>
            <div className="navbar">
                <div className="left">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span><img src="/camping-tent.svg" alt="" />FisiCamp</span>
                    </Link>
                </div>
            </div>
            <div className="container">
                <div className="back">
                    <button onClick={() => navigate("/trips")}><ArrowBackIosNewIcon className="arrow"/>Regresar a todas las reservas</button>
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Tu reserva está confirmada</h2>
                        <h4>Tienes una reserva en Location!</h4>
                        <img src="" alt="" />
                        <div className="place">
                            <div className="text">
                                <h4>Título del campamento</h4>
                                <span>Estadía de Leanne</span>
                            </div>
                            <img src="" alt="" />
                        </div>

                    </div>
                    <div className="right">
                        <div className="date">
                            <div className="checkIn">
                                <h4>Friday, June 14, 2024</h4>
                                <span>Check-in time is 4PM - 9PM</span>
                            </div>
                            <div className="checkOut">
                                <h4>Saturday, June 15, 2024</h4>
                                <span>Check-out 11AM</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="name">Dirección</span>
                            <span className="address">123 Main Street, San Francisco, CA 94105, United States</span>
                        </div>
                        <div className="item">
                            <span className="name">Conoce a tu host</span>
                            <span className="itemText">Contacta a Leanne para coordinar la llegada y la entrega de llaves: <span>+1 (123) 456-7890</span></span>
                        </div>
                        <div className="rules">
                            <div className="info">
                                <span className="name">Qué esperan de ti?</span>
                                <span className="itemText">Asegúrate de revisar las reglas de la casa.</span>
                            </div>
                            <span className="link">Ver reglas de la casa</span>
                        </div>
                        <div className="item">
                            <div className="body">
                                <h3>Información del pago</h3>
                                <div className="price">
                                    <span>S/76 x 1 noches</span>
                                    <span>S/76</span>
                                </div>
                                <div className="price">
                                    <span>Tarifa por servicio</span>
                                    <span>S/39</span>
                                </div>
                            </div>
                            <hr />
                            <div className="footer">
                                <span>Total (PEN)</span>
                                <span>S/115</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails