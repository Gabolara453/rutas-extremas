import React from 'react';
import "./css/footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo.png" alt="Aventuras Logo" />
          <h1>Aventuras</h1>
        </div>
        <img src="../assets/img/l7.jpg" />
        <div className="footer-links">
          <a href="/about">Acerca de</a>
          <a href="/contact">Contacto</a>
          <a href="/adventures">Aventuras</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
