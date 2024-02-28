import { Link, useNavigate, useParams } from "react-router-dom";
import "./bookDetails.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import moment from 'moment';

function BookDetails() {

    const navigate = useNavigate();
    const { bookId } = useParams();

    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        makeRequest.get(`/booking/${bookId}`).then(res => {
            setBookDetails(res.data);
        })
    }, [bookId])

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
                    <button onClick={() => navigate("/trips")}><ArrowBackIosNewIcon className="arrow" />Regresar a todas las reservas</button>
                </div>
                {bookDetails && <div className="wrapper">
                    <div className="left">
                        <h2>Tu reserva está confirmada</h2>
                        <h4>Tienes una reserva en {bookDetails.location}!</h4>
                        <img src={bookDetails.images[0].url} alt="" />
                        <div className="place">
                            <div className="text">
                                <h4>{bookDetails.title}</h4>
                                <span>Estadía de {bookDetails.host.firstName} {bookDetails.host.lastName}</span>
                            </div>
                            <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
                        </div>

                    </div>
                    <div className="right">
                        <div className="date">
                            <div className="checkIn">
                                <h4>{moment(bookDetails.initialDate).format('ddd, mmm DD, YYYY')}</h4>
                                <span>Check-in time is 8AM - 5PM</span>
                            </div>
                            <div className="checkOut">
                                <h4>{moment(bookDetails.finalDate).format('ddd, mmm DD, YYYY')}</h4>
                                <span>Check-out 11AM</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="name">Dirección</span>
                            <span className="address">{bookDetails.location}</span>
                        </div>
                        <div className="item">
                            <span className="name">Conoce a tu host</span>
                            <span className="itemText">Contacta a Leanne para coordinar la llegada y la entrega de llaves: <span>{bookDetails.host.email}</span></span>
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
                                {/* <div className="price">
                                    <span>S/76 x 1 noches</span>
                                    <span>S/76</span>
                                </div>
                                <div className="price">
                                    <span>Tarifa por servicio</span>
                                    <span>S/39</span>
                                </div> */}
                            </div>
                            <hr />
                            <div className="footer">
                                <span>Total (PEN)</span>
                                <span>S/{bookDetails.price}</span>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BookDetails