import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <footer className="footer page-content">
    <Row className="footer-content">
      <Col md="4" sm="12" className="footer-section">
        <h5>Acerca de</h5>
        <p className="footer-description">
          Sistema de gestión empresarial desarrollado con tecnologías modernas para optimizar tus procesos de negocio.
        </p>
      </Col>
      <Col md="4" sm="12" className="footer-section">
        <h5>Enlaces Rápidos</h5>
        <ul className="footer-links">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/admin/docs">Documentación API</a>
          </li>
          <li>
            <a href="/account/settings">Configuración</a>
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="footer-bottom">
      <Col md="12" className="text-center">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Taller 1. Todos los derechos reservados.</p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
