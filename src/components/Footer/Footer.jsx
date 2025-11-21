// Footer.jsx

import React from 'react';


const Footer = () => {
	return (
		<footer className="footer">
			{/* Solo muestra el texto de derechos reservados */}
			<p className="footer__copyright">
				&copy; {new Date().getFullYear()} El Último Párrafo. Todos los derechos reservados.
			</p>
		</footer>
	);
};

// Exporta el componente para ser usado en la app
export default Footer;
