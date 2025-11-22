import React, { useState } from "react";
import "./TermsConditions.css";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

const TermsConditions = ({ open, close, onAccept }) => {
  const [acceptedLocal, setAcceptedLocal] = useState(false);

  if (!open) return null;

  const handleAccept = () => {
    if (acceptedLocal) {
      onAccept(); 
      close();    
    }
  };

  return (
    <div className="terms-overlay">
      <div className="terms-modal">
        <h2>Términos y Condiciones</h2>

        <div className="terms-content">
          <h3>1. Uso del sitio</h3>
          <p>
            Este sitio permite buscar libros, ver detalles, gestionar listas personales 
            y escribir reseñas. El uso debe ser responsable y respetuoso.
          </p>

          <h3>2. Cuenta de usuario</h3>
          <p>
            El usuario es responsable de mantener la confidencialidad de sus datos 
            y del uso adecuado de su cuenta.
          </p>

          <h3>3. Privacidad</h3>
          <p>
            La información personal se usa únicamente para el funcionamiento del sitio 
            y no se comparte con terceros.
          </p>

          <h3>4. Contenido generado por usuarios</h3>
          <p>
            Las reseñas deben ser respetuosas y no incluir lenguaje ofensivo, 
            discriminatorio o ilegal.
          </p>

          <h3>5. Seguridad</h3>
          <p>
            El sistema utiliza autenticación mediante tokens. El usuario acepta 
            no intentar vulnerar la seguridad del sitio.
          </p>

          <h3>6. Aceptación</h3>
          <p>
            Al crear una cuenta o usar el sitio, aceptas estos términos y condiciones.
          </p>
        </div>

        <div className="terms-checkbox">
          <Checkbox
            label="He leído y acepto los Términos y Condiciones"
            checked={acceptedLocal}
            onChange={(e) => setAcceptedLocal(e.target.checked)}
          />
        </div>

        <div className="terms-buttons">
          <Button variant="secondary" size="medium" onClick={close}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={handleAccept}
            disabled={!acceptedLocal}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
