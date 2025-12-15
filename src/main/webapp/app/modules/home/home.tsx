import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardBody, Col, Row, Button, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faChartLine,
  faFileInvoice,
  faBoxes,
  faRocket,
  faShieldAlt,
  faBolt,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <div className="home-modern">
      <Container fluid>
        {/* Hero Section */}
        <Row className="hero-section">
          <Col lg="12">
            <div className="hero-content">
              <div className="hero-badge">
                <FontAwesomeIcon icon={faRocket} className="me-2" />
                Sistema de Gestión Empresarial
              </div>
              <h1 className="hero-title">
                Bienvenido, <span className="highlight">{account?.login || 'Invitado'}</span>
              </h1>
              <p className="hero-subtitle">
                Gestiona tu negocio de manera eficiente con nuestra plataforma completa de administración y control
              </p>

              {!account?.login && (
                <div className="hero-actions">
                  <Button tag={Link} to="/login" color="primary" size="lg" className="me-3">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Iniciar Sesión
                  </Button>
                  <Button tag={Link} to="/account/register" color="light" size="lg" outline>
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Status Card for Logged In Users */}
        {account?.login && (
          <Row className="mb-4">
            <Col lg="12">
              <Card className="status-card">
                <CardBody>
                  <div className="status-content">
                    <div className="status-icon">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </div>
                    <div className="status-info">
                      <h5>Sesión Activa</h5>
                      <p className="mb-0">
                        Has iniciado sesión como <strong>{account.login}</strong>
                      </p>
                    </div>
                    <div className="status-badge">
                      <span className="badge bg-success">Conectado</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {/* Features Section */}
        <Row className="features-section">
          <Col lg="12" className="mb-4">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faBolt} className="me-2" />
              Funcionalidades Principales
            </h2>
            <p className="section-subtitle">Todo lo que necesitas para gestionar tu empresa en un solo lugar</p>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <Card className="feature-card">
              <CardBody>
                <div className="feature-icon feature-icon-primary">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h4>Gestión de Clientes</h4>
                <p>Administra tu cartera de clientes, historial de compras y datos de contacto de forma centralizada.</p>
                {account?.login && (
                  <Button tag={Link} to="/proceso-clientes" color="primary" size="sm" block>
                    Ir a Clientes
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <Card className="feature-card">
              <CardBody>
                <div className="feature-icon feature-icon-success">
                  <FontAwesomeIcon icon={faFileInvoice} />
                </div>
                <h4>Facturación</h4>
                <p>Genera facturas, controla pagos y mantén un registro detallado de todas tus transacciones.</p>
                {account?.login && (
                  <Button tag={Link} to="/factura" color="success" size="sm" block>
                    Ver Facturas
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <Card className="feature-card">
              <CardBody>
                <div className="feature-icon feature-icon-info">
                  <FontAwesomeIcon icon={faBoxes} />
                </div>
                <h4>Inventario</h4>
                <p>Controla tu stock de productos, precios y disponibilidad en tiempo real.</p>
                {account?.login && (
                  <Button tag={Link} to="/producto" color="info" size="sm" block>
                    Ver Productos
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <Card className="feature-card">
              <CardBody>
                <div className="feature-icon feature-icon-warning">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h4>Reportes</h4>
                <p>Visualiza estadísticas y métricas importantes para tomar mejores decisiones de negocio.</p>
                {account?.login && (
                  <Button tag={Link} to="/admin/metrics" color="warning" size="sm" block disabled>
                    Próximamente
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Info Section for Non-logged Users */}
        {!account?.login && (
          <Row className="info-section">
            <Col lg="6" className="mb-4">
              <Card className="info-card info-card-primary">
                <CardBody>
                  <h4>
                    <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                    Cuentas de Prueba
                  </h4>
                  <p className="mb-3">Puedes probar el sistema con las siguientes credenciales:</p>
                  <div className="credential-box">
                    <div className="credential-item">
                      <strong>Administrador</strong>
                      <div className="credential-details">
                        <span>Usuario: admin</span>
                        <span>Contraseña: admin</span>
                      </div>
                    </div>
                    <div className="credential-item">
                      <strong>Usuario</strong>
                      <div className="credential-details">
                        <span>Usuario: user</span>
                        <span>Contraseña: user</span>
                      </div>
                    </div>
                  </div>
                  <Button tag={Link} to="/login" color="primary" block className="mt-3">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Iniciar Sesión Ahora
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6" className="mb-4">
              <Card className="info-card info-card-secondary">
                <CardBody>
                  <h4>
                    <FontAwesomeIcon icon={faRocket} className="me-2" />
                    ¿Nuevo aquí?
                  </h4>
                  <p className="mb-3">Crea tu cuenta y empieza a utilizar todas las funcionalidades del sistema de gestión empresarial.</p>
                  <ul className="benefits-list">
                    <li>Gestión completa de clientes</li>
                    <li>Sistema de facturación integrado</li>
                    <li>Control de inventario</li>
                    <li>Reportes y estadísticas</li>
                    <li>Interfaz moderna e intuitiva</li>
                  </ul>
                  <Button tag={Link} to="/account/register" color="success" block className="mt-3">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Crear Cuenta Gratis
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
