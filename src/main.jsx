import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeContextProvider } from './context/darkModeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { locale, addLocale, PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Limpiar',
  //...
});

locale('es');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId="359716433018-skuf9ju9t9u434vsg5285o8piuifb90k.apps.googleusercontent.com">
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </PrimeReactProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
