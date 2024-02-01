import { useNavigate } from "react-router-dom";
import "./bookingList.scss";

function BookingList() {

    const navigate = useNavigate();

    return (
        <div className='bookingList'>
            <div className="container">
                <h1 className="title">Viajes</h1>
                <div className="trips">
                    <div className="trip" onClick={() => navigate(`/trips/1`)}>
                        <div className="left">
                            <div className="top">
                                <h1>Titulo del Campamento</h1>
                                <span>Host: Leanne</span>
                            </div>
                            <div className="bottom">
                                <div className="dates">
                                    <h2>1 - 15 feb.</h2>
                                    <span>2024</span>
                                </div>
                                <hr />
                                <div className="location">
                                    <h2>24 Desert Avenue Joshua Tree, CA</h2>
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://images.surferseo.art/d6444d0b-49d0-473c-b839-34d6679f1bab.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="trip">
                        <div className="left">
                            <div className="top">
                                <h1>Titulo del Campamento</h1>
                                <span>Host: Leanne</span>
                            </div>
                            <div className="bottom">
                                <div className="dates">
                                    <h2>1 - 15 feb.</h2>
                                    <span>2024</span>
                                </div>
                                <hr />
                                <div className="location">
                                    <h2>24 Desert Avenue Joshua Tree, CA</h2>
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://images.surferseo.art/d6444d0b-49d0-473c-b839-34d6679f1bab.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="trip">
                        <div className="left">
                            <div className="top">
                                <h1>Titulo del Campamento</h1>
                                <span>Host: Leanne</span>
                            </div>
                            <div className="bottom">
                                <div className="dates">
                                    <h2>1 - 15 feb.</h2>
                                    <span>2024</span>
                                </div>
                                <hr />
                                <div className="location">
                                    <h2>24 Desert Avenue Joshua Tree, CA</h2>
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://images.surferseo.art/d6444d0b-49d0-473c-b839-34d6679f1bab.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="trip">
                        <div className="left">
                            <div className="top">
                                <h1>Titulo del Campamento</h1>
                                <span>Host: Leanne</span>
                            </div>
                            <div className="bottom">
                                <div className="dates">
                                    <h2>1 - 15 feb.</h2>
                                    <span>2024</span>
                                </div>
                                <hr />
                                <div className="location">
                                    <h2>24 Desert Avenue Joshua Tree, CA</h2>
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://images.surferseo.art/d6444d0b-49d0-473c-b839-34d6679f1bab.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="trip">
                        <div className="left">
                            <div className="top">
                                <h1>Titulo del Campamento</h1>
                                <span>Host: Leanne</span>
                            </div>
                            <div className="bottom">
                                <div className="dates">
                                    <h2>1 - 15 feb.</h2>
                                    <span>2024</span>
                                </div>
                                <hr />
                                <div className="location">
                                    <h2>24 Desert Avenue Joshua Tree, CA</h2>
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://images.surferseo.art/d6444d0b-49d0-473c-b839-34d6679f1bab.jpeg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingList