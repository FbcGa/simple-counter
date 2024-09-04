import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";

import { Counter } from "./component/counter.jsx";

function App() {
  const [counter, setCounter] = useState(0);
  const [initialValue, setInitialValue] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [alertTime, setAlertTime] = useState(null);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (counter > 0) {
          setCounter(counter - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, counter]);

  useEffect(() => {
    if (counter === alertTime && alertTime !== null) {
      alert("Se alcanzó el tiempo establecido");
      setIsRunning(false); // Detenemos el contador
    }
  }, [counter, alertTime]);

  const handleStart = () => {
    if (initialValue > 0) {
      setIsRunning(true);
    } else {
      alert("Por favor, ingrese un valor inicial válido.");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCounter(initialValue);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setInitialValue(value);
      setCounter(value);
    } else {
      alert("El valor inicial debe ser mayor que 0.");
    }
  };

  const handleAlertInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      if (initialValue && value >= initialValue) {
        alert("El tiempo de alerta debe ser menor que el valor inicial.");
      } else {
        setAlertTime(value);
      }
    } else {
      alert("El tiempo de alerta debe ser mayor que 0.");
    }
  };

  const calculateDigits = (value) => {
    const four = Math.floor(value / 1000) % 10;
    const three = Math.floor(value / 100) % 10;
    const two = Math.floor(value / 10) % 10;
    const one = value % 10;

    return { four, three, two, one };
  };

  const digits = calculateDigits(counter);

  return (
    <div className="container">
      <input
        type="number"
        value={initialValue}
        onChange={handleInputChange}
        placeholder="Ingrese el valor inicial. Ejemplo 200"
      />
      <input
        type="number"
        value={alertTime}
        onChange={handleAlertInputChange}
        placeholder="Ingrese el tiempo de alerta. Menor al valor inicial"
      />
      <section className="btns">
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handleStop}>Parar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </section>

      <Counter
        digitOne={digits.one}
        digitTwo={digits.two}
        digitThree={digits.three}
        digitFour={digits.four}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
