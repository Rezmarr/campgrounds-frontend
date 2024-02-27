import { Link, useLocation, useNavigate } from "react-router-dom";
import "./bookingForm.scss"
import moment from 'moment';
import 'moment/locale/es.js'
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PaymentForm from "../../components/paymentForm/PaymentForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Backdrop from "../../components/backdrop/Backdrop";
import { makeRequest } from "../../axios";

function ShowBooking() {

    const location = useLocation();
    const navigate = useNavigate();

    const [payIsOpen, setPayIsOpen] = useState(false);
    const [bookId, setBookId] = useState(null);

    const { state } = location;

    const book = state && state.book;

    const [formData, setFormData] = useState({
        campgroundId: book.id,
        arrivingDate: moment(book.initialDate).format("dd/MM/yyyy"),
        leavingDate: moment(book.finalDate).format("dd/MM/yyyy"),
        numNights: moment(book.finalDate).diff(moment(book.initialDate), 'days') + 1,
        pricePerNight: book.price
    });

    console.log(book)

    useEffect(() => {
        moment().locale('es');
    }, []);

    useEffect(() => {
        // Resetea la posición de desplazamiento al principio de la página
        window.scrollTo(0, 0);
    }, []);

    if (payIsOpen) {
        document.body.classList.add('hide-scrollbar');
    } else {
        document.body.classList.remove('hide-scrollbar');
    }

    const init = moment(book.initialDate);
    const fin = moment(book.finalDate);

    const handleSubmit = () => {
        // setPayIsOpen(true);
        makeRequest.post(`/booking`, formData).then(res => {
            console.log(res.data);
            return setPayIsOpen(true);
        });
        //Obtener id de la reserva creada y reemplazar
        setBookId(1);
    }

    return (
        <div className="bookingForm">
            <div className="navbar">
                <div className="left">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span><img src="/camping-tent.svg" alt="" />FisiCamp</span>
                    </Link>
                </div>
            </div>
            <div className="container">
                <div className="wrapper">
                    <div className="left">
                        <div className="title">
                            <ArrowBackIosNewIcon className="back" onClick={() => navigate(`/${book.id}`)} />
                            <h1>Solicita reservar</h1>
                        </div>
                        <h2>Tu viaje</h2>
                        <div className="details">
                            <div className="item">
                                <h3>Fecha de llegada</h3>
                                <span>{init.format("D")} - {init.format("MMMM")}</span>
                            </div>
                            <div className="item">
                                <h3>Fecha de salida</h3>
                                <span>{fin.format("D")} - {fin.format("MMMM")}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="payment">
                            <div className="head">
                                <h2>Paga con</h2>
                                <div className="logos">
                                    <img src="/logo_visa.svg" alt="logo visa" />
                                    <img src="/logo_mastercard.svg" alt=" logo mastercard" />
                                </div>
                            </div>
                            <div className="data">
                                <div className="selectCard">
                                    <PaymentOutlinedIcon />
                                    Tarjeta de crédito o débito
                                    <ExpandMoreIcon className="expand" />
                                </div>
                                <div className="cardDetails">
                                    {/* <div className="item">
                                        <span>Número de tarjeta</span>
                                        <input type="text" name="" id="" />
                                    </div> */}
                                    <PaymentForm />
                                </div>
                                <div className="address">
                                    <h3>Dirección de facturación</h3>
                                    <div className="item">
                                        <label htmlFor="address">Dirección</label>
                                        <input type="text" name="" id="address" />
                                    </div>
                                    <div className="item">
                                        <label htmlFor="ApNumber">Número de apartamento</label>
                                        <input type="text" name="" id="ApNumber" />
                                    </div>
                                    <div className="item">
                                        <label htmlFor="city">Ciudad</label>
                                        <input type="text" name="" id="city" />
                                    </div>
                                    <div className="items">
                                        <div className="item">
                                            <label htmlFor="province">Provincia/Departamento</label>
                                            <input type="text" name="" id="province" />
                                        </div>
                                        <div className="item">
                                            <label htmlFor="postalCode">Código postal</label>
                                            <input type="text" name="" id="postalCode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="rules">
                            <h2>Reglas fundamentales</h2>
                            <p>Pedimos a todos los huéspedes que recuerden algunas cosas sencillas sobre lo que hace que un huésped sea excelente.</p>
                            <ul>
                                <li>Sigue las reglas de la casa</li>
                                <li>Trata el alojamiento del anfitrión como si fuera tuyo</li>
                            </ul>
                        </div>
                        <hr />
                        <button onClick={handleSubmit}>Solicita reservar</button>
                    </div>
                    <div className="right">
                        <div className="details">
                            <div className="header">
                                <img src="" alt="" />
                                <div className="info">
                                    <span className="name">{book.title}</span>
                                    <span className="location">{book.location}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="body">
                                <h2>Información del precio</h2>
                                <div className="price">
                                    <span>S/{book.price} x {book.days} noches</span>
                                    <span>S/{book.price * book.days}</span>
                                </div>
                                {/* <div className="price">
                                    <span>Tarifa de limpieza</span>
                                    <span>S/435.63</span>
                                </div> */}
                                <div className="price">
                                    <span>Tarifa por servicio</span>
                                    <span>S/39</span>
                                </div>
                            </div>
                            <hr />
                            <div className="footer">
                                <span>Total (PEN)</span>
                                <span>S/{book.price * book.days + 39}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {payIsOpen ? <Backdrop bookId={bookId} /> : <></>}
        </div>
    )
}

export default ShowBooking