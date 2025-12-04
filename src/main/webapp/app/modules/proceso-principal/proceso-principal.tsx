import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  InputGroup,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faSearch,
  faEdit,
  faTrash,
  faEye,
  faFileExport,
  faFilter,
  faUsers,
  faChartLine,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import './proceso-principal.scss';

interface Cliente {
  id: number;
  nombre: string;
  rucCi: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaAlta: string;
  estado: 'activo' | 'inactivo';
  facturas: number;
  totalCompras: number;
}

const ProcesoClientes = () => {
  // Estado para datos mock
  const [clientes] = useState<Cliente[]>([
    {
      id: 1,
      nombre: 'Juan Pérez García',
      rucCi: '1234567-8',
      telefono: '+595 981 123 456',
      email: 'juan.perez@email.com',
      direccion: 'Av. Eusebio Ayala Km 4.5, Asunción',
      fechaAlta: '2024-01-15',
      estado: 'activo',
      facturas: 15,
      totalCompras: 42500000,
    },
    {
      id: 2,
      nombre: 'María Rodríguez López',
      rucCi: '0987654-3',
      telefono: '+595 982 987 654',
      email: 'maria.rodriguez@email.com',
      direccion: 'Av. España 1234, Ciudad del Este',
      fechaAlta: '2024-02-20',
      estado: 'activo',
      facturas: 28,
      totalCompras: 89500000,
    },
    {
      id: 3,
      nombre: 'Carlos Gómez Martínez',
      rucCi: '1122334-5',
      telefono: '+595 983 555 123',
      email: 'carlos.gomez@email.com',
      direccion: 'Ruta 2 Km 30, Encarnación',
      fechaAlta: '2023-11-10',
      estado: 'activo',
      facturas: 42,
      totalCompras: 137500000,
    },
    {
      id: 4,
      nombre: 'Ana Martínez Silva',
      rucCi: '5566778-9',
      telefono: '+595 984 444 567',
      email: 'ana.martinez@email.com',
      direccion: 'Av. Mariscal López 567, San Lorenzo',
      fechaAlta: '2024-03-05',
      estado: 'inactivo',
      facturas: 8,
      totalCompras: 15250000,
    },
    {
      id: 5,
      nombre: 'Luis Fernández Ruiz',
      rucCi: '9988776-6',
      telefono: '+595 985 222 334',
      email: 'luis.fernandez@email.com',
      direccion: 'Av. República Argentina 1500, Luque',
      fechaAlta: '2024-01-28',
      estado: 'activo',
      facturas: 19,
      totalCompras: 55600000,
    },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    const coincideBusqueda =
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.rucCi.includes(busqueda) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === 'todos' || cliente.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  // Calcular estadísticas
  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter(c => c.estado === 'activo').length;
  const totalFacturasGlobal = clientes.reduce((sum, c) => sum + c.facturas, 0);
  const totalVentasGlobal = clientes.reduce((sum, c) => sum + c.totalCompras, 0);

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Handlers
  const toggleModalNuevo = () => setModalNuevo(!modalNuevo);
  const toggleModalDetalle = () => setModalDetalle(!modalDetalle);

  const verDetalle = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    toggleModalDetalle();
  };

  const handleNuevoCliente = () => {
    // Lógica para crear nuevo cliente
    // Aquí se conectaría con el backend cuando esté disponible
    toggleModalNuevo();
  };

  return (
    <div className="proceso-clientes">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h1 className="page-title">
                <FontAwesomeIcon icon={faUsers} className="me-3" />
                Gestión de Clientes
              </h1>
              <p className="page-subtitle">Administra y supervisa tu cartera de clientes en Paraguay</p>
            </div>
          </Col>
        </Row>

        {/* Tarjetas de estadísticas */}
        <Row className="mb-4">
          <Col md="3" sm="6" className="mb-3">
            <Card className="stats-card stats-card-primary">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="stats-content">
                  <h3>{totalClientes}</h3>
                  <p>Total Clientes</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" sm="6" className="mb-3">
            <Card className="stats-card stats-card-success">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="stats-content">
                  <h3>{clientesActivos}</h3>
                  <p>Clientes Activos</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" sm="6" className="mb-3">
            <Card className="stats-card stats-card-info">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faFileExport} />
                </div>
                <div className="stats-content">
                  <h3>{totalFacturasGlobal}</h3>
                  <p>Facturas Generadas</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" sm="6" className="mb-3">
            <Card className="stats-card stats-card-warning">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="stats-content">
                  <h3>{formatCurrency(totalVentasGlobal)}</h3>
                  <p>Ventas Totales</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Panel de control */}
        <Row className="mb-4">
          <Col>
            <Card className="control-panel">
              <CardBody>
                <Row className="align-items-center">
                  <Col md="5" className="mb-3 mb-md-0">
                    <InputGroup>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                      <Input
                        type="text"
                        placeholder="Buscar por nombre, RUC/CI o email..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md="3" className="mb-3 mb-md-0">
                    <InputGroup>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faFilter} />
                      </span>
                      <Input type="select" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value as any)}>
                        <option value="todos">Todos los estados</option>
                        <option value="activo">Activos</option>
                        <option value="inactivo">Inactivos</option>
                      </Input>
                    </InputGroup>
                  </Col>
                  <Col md="4" className="text-md-end">
                    <Button color="success" onClick={toggleModalNuevo}>
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      Nuevo Cliente
                    </Button>
                    <Button color="secondary" outline className="ms-2">
                      <FontAwesomeIcon icon={faFileExport} className="me-2" />
                      Exportar
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Tabla de clientes */}
        <Row>
          <Col>
            <Card className="table-card">
              <CardHeader>
                <h5 className="mb-0">
                  Listado de Clientes
                  <Badge color="primary" className="ms-2">
                    {clientesFiltrados.length}
                  </Badge>
                </h5>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table hover className="clientes-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>RUC/CI</th>
                        <th>Contacto</th>
                        <th>Fecha Alta</th>
                        <th>Facturas</th>
                        <th>Total Compras</th>
                        <th>Estado</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientesFiltrados.length > 0 ? (
                        clientesFiltrados.map(cliente => (
                          <tr key={cliente.id}>
                            <td>
                              <span className="cliente-id">#{cliente.id}</span>
                            </td>
                            <td>
                              <div className="cliente-info">
                                <div className="cliente-avatar">{cliente.nombre.charAt(0)}</div>
                                <div>
                                  <div className="cliente-nombre">{cliente.nombre}</div>
                                  <div className="cliente-direccion">{cliente.direccion}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-muted">{cliente.rucCi}</span>
                            </td>
                            <td>
                              <div className="contacto-info">
                                <div>
                                  <FontAwesomeIcon icon={faEnvelope} className="me-1 text-primary" />
                                  {cliente.email}
                                </div>
                                <div>
                                  <FontAwesomeIcon icon={faPhone} className="me-1 text-success" />
                                  {cliente.telefono}
                                </div>
                              </div>
                            </td>
                            <td>{new Date(cliente.fechaAlta).toLocaleDateString('es-PY')}</td>
                            <td>
                              <Badge color="info">{cliente.facturas}</Badge>
                            </td>
                            <td>
                              <strong className="text-success">{formatCurrency(cliente.totalCompras)}</strong>
                            </td>
                            <td>
                              <Badge color={cliente.estado === 'activo' ? 'success' : 'secondary'}>
                                {cliente.estado === 'activo' ? 'Activo' : 'Inactivo'}
                              </Badge>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <Button color="info" size="sm" onClick={() => verDetalle(cliente)} title="Ver detalle">
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                                <Button color="warning" size="sm" title="Editar">
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button color="danger" size="sm" title="Eliminar">
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center py-5">
                            <div className="no-data">
                              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3 text-muted" />
                              <h5>No se encontraron clientes</h5>
                              <p className="text-muted">Intenta con otros criterios de búsqueda</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal Nuevo Cliente */}
        <Modal isOpen={modalNuevo} toggle={toggleModalNuevo} size="lg">
          <ModalHeader toggle={toggleModalNuevo}>
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Registrar Nuevo Cliente
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="nombre">Nombre Completo *</Label>
                    <Input type="text" id="nombre" placeholder="Ingrese el nombre completo" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="rucCi">RUC/CI *</Label>
                    <Input type="text" id="rucCi" placeholder="Ingrese RUC o Cédula" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="telefono">Teléfono *</Label>
                    <Input type="tel" id="telefono" placeholder="+595 981 123 456" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="email">Email *</Label>
                    <Input type="email" id="email" placeholder="cliente@email.com" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="direccion">Dirección</Label>
                <Input type="text" id="direccion" placeholder="Ingrese la dirección completa" />
              </FormGroup>
              <FormGroup>
                <Label for="estado">Estado</Label>
                <Input type="select" id="estado">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalNuevo}>
              Cancelar
            </Button>
            <Button color="success" onClick={handleNuevoCliente}>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registrar Cliente
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal Detalle Cliente */}
        <Modal isOpen={modalDetalle} toggle={toggleModalDetalle} size="lg">
          <ModalHeader toggle={toggleModalDetalle}>
            <FontAwesomeIcon icon={faEye} className="me-2" />
            Detalle del Cliente
          </ModalHeader>
          <ModalBody>
            {clienteSeleccionado && (
              <div className="cliente-detalle">
                <Row>
                  <Col md="12" className="mb-4">
                    <div className="cliente-header-detalle">
                      <div className="cliente-avatar-grande">{clienteSeleccionado.nombre.charAt(0)}</div>
                      <div className="ms-3">
                        <h3>{clienteSeleccionado.nombre}</h3>
                        <Badge color={clienteSeleccionado.estado === 'activo' ? 'success' : 'secondary'}>
                          {clienteSeleccionado.estado}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="mb-3">
                    <div className="info-item">
                      <strong>RUC/CI:</strong>
                      <span>{clienteSeleccionado.rucCi}</span>
                    </div>
                  </Col>
                  <Col md="6" className="mb-3">
                    <div className="info-item">
                      <strong>Fecha de Alta:</strong>
                      <span>{new Date(clienteSeleccionado.fechaAlta).toLocaleDateString('es-PY')}</span>
                    </div>
                  </Col>
                  <Col md="12" className="mb-3">
                    <div className="info-item">
                      <strong>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Email:
                      </strong>
                      <span>{clienteSeleccionado.email}</span>
                    </div>
                  </Col>
                  <Col md="12" className="mb-3">
                    <div className="info-item">
                      <strong>
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        Teléfono:
                      </strong>
                      <span>{clienteSeleccionado.telefono}</span>
                    </div>
                  </Col>
                  <Col md="12" className="mb-3">
                    <div className="info-item">
                      <strong>Dirección:</strong>
                      <span>{clienteSeleccionado.direccion}</span>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md="6" className="mb-3">
                    <Card className="mini-stats">
                      <CardBody className="text-center">
                        <h4 className="text-info">{clienteSeleccionado.facturas}</h4>
                        <p className="mb-0">Facturas Emitidas</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" className="mb-3">
                    <Card className="mini-stats">
                      <CardBody className="text-center">
                        <h4 className="text-success">{formatCurrency(clienteSeleccionado.totalCompras)}</h4>
                        <p className="mb-0">Total en Compras</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalDetalle}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ProcesoClientes;
