import { useEffect, useState } from "react";
import "./book.scss";
import { Calendar } from 'primereact/calendar';
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function Book({ data }) {

    const fechaActual = new Date();

    // Agregar un día a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + 1);

    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [days, setDays] = useState(0);

    const navigate = useNavigate();

    const { id } = useParams();

    const handleBook = () => {
        const book = {
            initialDate,
            finalDate,
            days,
            ...data
        };

        navigate(`/${id}/reserve`, { state: { book } });
    }

    useEffect(() => {
        const date1 = moment(initialDate);
        const date2 = moment(finalDate);
        setDays(date2.diff(date1, 'days') + 1);
    }, [finalDate, initialDate])

    const changeInitialDate = (e) => {
        setInitialDate(e.value);
    }

    const changeFinalDate = (e) => {
        setFinalDate(e.value);
    }

    console.log(days);

    return (
        <div className="book">
            <span>S/{data.price} noche</span>
            <div className="dates">
                <div className="arrival">
                    <span>LLEGADA</span>
                    <Calendar value={initialDate} onChange={changeInitialDate} dateFormat="dd/mm/yy" locale="es" readOnlyInput />
                </div>
                <div className="departure">
                    <span>SALIDA</span>
                    <Calendar value={finalDate} onChange={changeFinalDate} dateFormat="dd/mm/yy" locale="es" readOnlyInput />
                </div>
            </div>
            <button onClick={handleBook}>Reserva</button>
            <div className="rates">
                <div className="rate">
                    <span className="rateName">S/{data.price} x {days} noches</span>
                    <span>S/{data.price * days}</span>
                </div>
                <div className="rate">
                    <span className="rateName">Tarifa por servicio</span>
                    <span>S/39</span>
                </div>
            </div>
            <hr />
            <div className="total">
                <span>Total</span>
                <span>S/{(data.price * days) + 39}</span>
            </div>
            {/* <div className="selectArrival">
                <Calendar value={date} onChange={(e) => setDate(e.value)} />
            </div>
            <div className="selectDeparture">

            </div> */}
        </div>
    )
}

export default Book