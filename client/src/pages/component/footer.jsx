import React from 'react';
import "./css/footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={require('../assets/img/l7.jpg')} alt="Mi Imagen"/>
        </div>
        <div className="footer-links">
          <a href="/about">Acerca de Nosotros</a>
          <a href="/contact">Contacto</a>
          <a href="/adventures">Aventuras</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
