import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Alert,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faSearch,
  faEdit,
  faTrash,
  faEye,
  faUsers,
  faChartLine,
  faEnvelope,
  faPhone,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './proceso-principal.scss';

interface Cliente {
  id: number;
  nombre: string;
  rucCi?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  fechaAlta?: string;
}

const ProcesoClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    rucCi: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Cliente[]>('/api/clientes');
      setClientes(response.data);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const clientesFiltrados = clientes.filter(
    cliente =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (cliente.rucCi && cliente.rucCi.includes(busqueda)) ||
      (cliente.email && cliente.email.toLowerCase().includes(busqueda.toLowerCase())),
  );

  const formatFecha = (fecha?: string) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-PY');
  };

  const toggleModalNuevo = () => {
    setModalNuevo(!modalNuevo);
    if (!modalNuevo) resetFormData();
  };

  const toggleModalDetalle = () => setModalDetalle(!modalDetalle);

  const toggleModalEditar = () => {
    setModalEditar(!modalEditar);
    if (!modalEditar && clienteSeleccionado) {
      setFormData({
        nombre: clienteSeleccionado.nombre,
        rucCi: clienteSeleccionado.rucCi || '',
        telefono: clienteSeleccionado.telefono || '',
        email: clienteSeleccionado.email || '',
        direccion: clienteSeleccionado.direccion || '',
      });
    }
  };

  const toggleModalEliminar = () => setModalEliminar(!modalEliminar);

  const resetFormData = () => {
    setFormData({ nombre: '', rucCi: '', telefono: '', email: '', direccion: '' });
  };

  const verDetalle = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    toggleModalDetalle();
  };

  const editarCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    toggleModalEditar();
  };

  const confirmarEliminar = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    toggleModalEliminar();
  };

  const handleNuevoCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nuevoCliente = { ...formData, fechaAlta: new Date().toISOString().split('T')[0] };
      await axios.post('/api/clientes', nuevoCliente);
      await cargarClientes();
      toggleModalNuevo();
      resetFormData();
    } catch (err) {
      setError('Error al crear el cliente');
    }
  };

  const handleActualizarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSeleccionado) return;
    try {
      const clienteActualizado = { ...clienteSeleccionado, ...formData };
      await axios.put(`/api/clientes/${clienteSeleccionado.id}`, clienteActualizado);
      await cargarClientes();
      toggleModalEditar();
      setClienteSeleccionado(null);
    } catch (err) {
      setError('Error al actualizar el cliente');
    }
  };

  const handleEliminarCliente = async () => {
    if (!clienteSeleccionado) return;
    try {
      await axios.delete(`/api/clientes/${clienteSeleccionado.id}`);
      await cargarClientes();
      toggleModalEliminar();
      setClienteSeleccionado(null);
    } catch (err) {
      setError('Error al eliminar el cliente');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="proceso-clientes">
      <Container fluid>
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

        {error && (
          <Alert color="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Row className="mb-4">
          <Col md="4" sm="6" className="mb-3">
            <Card className="stats-card stats-card-primary">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="stats-content">
                  <h3>{clientes.length}</h3>
                  <p>Total Clientes</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" sm="6" className="mb-3">
            <Card className="stats-card stats-card-success">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="stats-content">
                  <h3>{clientesFiltrados.length}</h3>
                  <p>Resultados</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" sm="6" className="mb-3">
            <Card className="stats-card stats-card-info">
              <CardBody>
                <div className="stats-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="stats-content">
                  <h3>
                    <Link to="/factura" className="text-white text-decoration-none">
                      Ver Facturas
                    </Link>
                  </h3>
                  <p>Ir a Facturas</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="control-panel">
              <CardBody>
                <Row className="align-items-center">
                  <Col md="7" className="mb-3 mb-md-0">
                    <InputGroup>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                      <Input
                        type="text"
                        placeholder="Buscar por nombre, RUC/CI o email..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        disabled={loading}
                      />
                    </InputGroup>
                  </Col>
                  <Col md="5" className="text-md-end">
                    <Button color="success" onClick={toggleModalNuevo} disabled={loading}>
                      <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                      Nuevo Cliente
                    </Button>
                    <Button color="info" onClick={cargarClientes} disabled={loading} className="ms-2">
                      <FontAwesomeIcon icon={loading ? faSpinner : faSearch} spin={loading} className="me-2" />
                      Actualizar
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="table-card">
              <CardHeader>
                <h5 className="mb-0">
                  Listado de Clientes{' '}
                  <Badge color="primary" className="ms-2">
                    {clientesFiltrados.length}
                  </Badge>
                </h5>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="text-center py-5">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary mb-3" />
                    <p>Cargando clientes...</p>
                  </div>
                ) : clientesFiltrados.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">No se encontraron clientes</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table hover className="clientes-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Cliente</th>
                          <th>RUC/CI</th>
                          <th>Contacto</th>
                          <th>Fecha Alta</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientesFiltrados.map(cliente => (
                          <tr key={cliente.id}>
                            <td>
                              <span className="cliente-id">#{cliente.id}</span>
                            </td>
                            <td>
                              <div className="cliente-info">
                                <div className="cliente-avatar">{cliente.nombre.charAt(0).toUpperCase()}</div>
                                <div>
                                  <div className="cliente-nombre">{cliente.nombre}</div>
                                  {cliente.direccion && <div className="cliente-direccion">{cliente.direccion}</div>}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-muted">{cliente.rucCi || 'N/A'}</span>
                            </td>
                            <td>
                              <div className="contacto-info">
                                {cliente.email && (
                                  <div>
                                    <FontAwesomeIcon icon={faEnvelope} className="me-1 text-primary" />
                                    {cliente.email}
                                  </div>
                                )}
                                {cliente.telefono && (
                                  <div>
                                    <FontAwesomeIcon icon={faPhone} className="me-1 text-success" />
                                    {cliente.telefono}
                                  </div>
                                )}
                                {!cliente.email && !cliente.telefono && <span className="text-muted">N/A</span>}
                              </div>
                            </td>
                            <td>{formatFecha(cliente.fechaAlta)}</td>
                            <td>
                              <div className="action-buttons">
                                <Button color="info" size="sm" onClick={() => verDetalle(cliente)} title="Ver">
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                                <Button color="warning" size="sm" onClick={() => editarCliente(cliente)} title="Editar">
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button color="danger" size="sm" onClick={() => confirmarEliminar(cliente)} title="Eliminar">
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal Nuevo Cliente */}
        <Modal isOpen={modalNuevo} toggle={toggleModalNuevo} size="lg">
          <Form onSubmit={handleNuevoCliente}>
            <ModalHeader toggle={toggleModalNuevo}>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registrar Nuevo Cliente
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nombre Completo *</Label>
                    <Input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>RUC/CI</Label>
                    <Input type="text" name="rucCi" value={formData.rucCi} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Teléfono</Label>
                    <Input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="+595 981 123 456"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Dirección</Label>
                <Input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" type="button" onClick={toggleModalNuevo}>
                Cancelar
              </Button>
              <Button color="success" type="submit">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Crear
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Modal Editar Cliente */}
        <Modal isOpen={modalEditar} toggle={toggleModalEditar} size="lg">
          <Form onSubmit={handleActualizarCliente}>
            <ModalHeader toggle={toggleModalEditar}>
              <FontAwesomeIcon icon={faEdit} className="me-2" />
              Editar Cliente
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nombre Completo *</Label>
                    <Input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>RUC/CI</Label>
                    <Input type="text" name="rucCi" value={formData.rucCi} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Teléfono</Label>
                    <Input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Dirección</Label>
                <Input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" type="button" onClick={toggleModalEditar}>
                Cancelar
              </Button>
              <Button color="warning" type="submit">
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                Actualizar
              </Button>
            </ModalFooter>
          </Form>
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
                <Row className="mb-4">
                  <Col>
                    <div className="cliente-header-detalle">
                      <div className="cliente-avatar-grande">{clienteSeleccionado.nombre.charAt(0).toUpperCase()}</div>
                      <div className="ms-3">
                        <h3>{clienteSeleccionado.nombre}</h3>
                        <p className="text-muted">ID: #{clienteSeleccionado.id}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="mb-3">
                    <div className="info-item">
                      <strong>RUC/CI:</strong>
                      <span>{clienteSeleccionado.rucCi || 'N/A'}</span>
                    </div>
                  </Col>
                  <Col md="6" className="mb-3">
                    <div className="info-item">
                      <strong>Fecha de Alta:</strong>
                      <span>{formatFecha(clienteSeleccionado.fechaAlta)}</span>
                    </div>
                  </Col>
                  {clienteSeleccionado.email && (
                    <Col md="12" className="mb-3">
                      <div className="info-item">
                        <strong>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          Email:
                        </strong>
                        <span>{clienteSeleccionado.email}</span>
                      </div>
                    </Col>
                  )}
                  {clienteSeleccionado.telefono && (
                    <Col md="12" className="mb-3">
                      <div className="info-item">
                        <strong>
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          Teléfono:
                        </strong>
                        <span>{clienteSeleccionado.telefono}</span>
                      </div>
                    </Col>
                  )}
                  {clienteSeleccionado.direccion && (
                    <Col md="12" className="mb-3">
                      <div className="info-item">
                        <strong>Dirección:</strong>
                        <span>{clienteSeleccionado.direccion}</span>
                      </div>
                    </Col>
                  )}
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

        {/* Modal Eliminar Cliente */}
        <Modal isOpen={modalEliminar} toggle={toggleModalEliminar}>
          <ModalHeader toggle={toggleModalEliminar}>
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Confirmar Eliminación
          </ModalHeader>
          <ModalBody>
            {clienteSeleccionado && (
              <div>
                <p>
                  ¿Está seguro de que desea eliminar al cliente <strong>{clienteSeleccionado.nombre}</strong>?
                </p>
                <Alert color="warning">Esta acción no se puede deshacer.</Alert>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalEliminar}>
              Cancelar
            </Button>
            <Button color="danger" onClick={handleEliminarCliente}>
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ProcesoClientes;
