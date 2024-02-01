import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/lib/styles.scss";
import "./paymentForm.scss";

const PaymentForm = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div className='paymentForm'>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form>
                <div className="item">
                    <label htmlFor="number">Número de tarjeta</label>
                    <input
                        type="number"
                        id='number'
                        name="number"
                        placeholder="0000 0000 0000 0000"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="item">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        placeholder="Titular de la tarjeta"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="items">
                    <div className="item">
                        <label htmlFor="expiry">Caducidad</label>
                        <input
                            type="tel"
                            id='expiry'
                            name="expiry"
                            placeholder="MM/AA"
                            pattern="\d\d/\d\d"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="cvc">Código CVV</label>
                        <input
                            type="tel"
                            id='cvc'
                            name="cvc"
                            placeholder="123"
                            pattern="\d{3,4}"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;