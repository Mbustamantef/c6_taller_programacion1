import './factura-nueva.scss';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Container, Row, Col, FormGroup, Label, Input, Table, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faTrash, faSave, faTimes, faArrowLeft, faCalculator } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { useAppDispatch } from 'app/config/store';

interface Cliente {
  id: number;
  nombre: string;
  rucCi?: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precioUnitario: number;
  activo: boolean;
}

interface ItemVenta {
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export const FacturaNueva = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<number | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [items, setItems] = useState<ItemVenta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    cargarClientes();
    cargarProductos();
  }, []);

  const cargarClientes = async () => {
    try {
      const response = await axios.get<Cliente[]>('/api/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error('Error cargando clientes:', err);
    }
  };

  const cargarProductos = async () => {
    try {
      const response = await axios.get<Producto[]>('/api/productos');
      const productosActivos = response.data.filter(p => p.activo);
      setProductos(productosActivos);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  };

  const agregarItem = () => {
    if (!productoSeleccionado || cantidad <= 0) {
      setError('Seleccione un producto y cantidad válida');
      return;
    }

    const producto = productos.find(p => p.id === productoSeleccionado);
    if (!producto) return;

    const subtotal = producto.precioUnitario * cantidad;

    const nuevoItem: ItemVenta = {
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad,
      precioUnitario: producto.precioUnitario,
      subtotal,
    };

    setItems([...items, nuevoItem]);
    setProductoSeleccionado(null);
    setCantidad(1);
    setError(null);
  };

  const eliminarItem = (index: number) => {
    const nuevosItems = items.filter((_, i) => i !== index);
    setItems(nuevosItems);
  };

  const calcularTotal = (): number => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  const formatearMoneda = (valor: number): string => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const registrarVenta = async () => {
    if (!clienteSeleccionado) {
      setError('Debe seleccionar un cliente');
      return;
    }

    if (items.length === 0) {
      setError('Debe agregar al menos un producto');
      return;
    }

    setLoading(true);
    setError(null);

    const ventaRequest = {
      clienteId: clienteSeleccionado,
      items: items.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
      })),
    };

    try {
      const response = await axios.post('/api/ventas', ventaRequest);
      setSuccess(`Factura registrada exitosamente. ID: ${response.data.id}`);
      setTimeout(() => {
        navigate('/factura');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="factura-nueva-modern">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="form-header">
              <Button tag={Link} to="/factura" color="light" className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver
              </Button>
              <h1 className="form-title">
                <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
                Nueva Factura
              </h1>
              <p className="form-subtitle">Complete los datos para registrar una nueva venta</p>
            </div>
          </Col>
        </Row>

        {/* Mensajes */}
        {error && (
          <Alert color="danger" className="mb-4">
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" className="mb-4">
            {success}
          </Alert>
        )}

        <Row>
          <Col lg="8">
            {/* Selección de Cliente */}
            <Card className="mb-4">
              <CardBody>
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Datos del Cliente
                </h5>
                <FormGroup>
                  <Label for="cliente-select">Cliente *</Label>
                  <Input
                    type="select"
                    id="cliente-select"
                    value={clienteSeleccionado || ''}
                    onChange={e => setClienteSeleccionado(Number(e.target.value))}
                    disabled={loading}
                  >
                    <option value="">Seleccione un cliente...</option>
                    {clientes.map(cliente => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.rucCi ? `- ${cliente.rucCi}` : ''}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </CardBody>
            </Card>

            {/* Agregar Productos */}
            <Card className="mb-4">
              <CardBody>
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Agregar Productos
                </h5>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="producto-select">Producto</Label>
                      <Input
                        type="select"
                        id="producto-select"
                        value={productoSeleccionado || ''}
                        onChange={e => setProductoSeleccionado(Number(e.target.value))}
                        disabled={loading}
                      >
                        <option value="">Seleccione un producto...</option>
                        {productos.map(producto => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre} - {formatearMoneda(producto.precioUnitario)}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label for="cantidad-input">Cantidad</Label>
                      <Input
                        type="number"
                        id="cantidad-input"
                        min="1"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                        disabled={loading}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3" className="d-flex align-items-end">
                    <FormGroup className="w-100">
                      <Button color="primary" onClick={agregarItem} disabled={loading} className="w-100">
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Agregar
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* Tabla de Items */}
            {items.length > 0 && (
              <Card>
                <CardBody>
                  <h5 className="card-title">Detalle de la Venta</h5>
                  <div className="table-responsive">
                    <Table className="items-table">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th className="text-center">Cantidad</th>
                          <th className="text-end">Precio Unit.</th>
                          <th className="text-end">Subtotal</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.productoNombre}</td>
                            <td className="text-center">{item.cantidad}</td>
                            <td className="text-end">{formatearMoneda(item.precioUnitario)}</td>
                            <td className="text-end font-weight-bold">{formatearMoneda(item.subtotal)}</td>
                            <td className="text-center">
                              <Button color="danger" size="sm" onClick={() => eliminarItem(index)} disabled={loading}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            )}
          </Col>

          {/* Resumen */}
          <Col lg="4">
            <Card className="summary-card sticky-top">
              <CardBody>
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faCalculator} className="me-2" />
                  Resumen
                </h5>
                <hr />
                <div className="summary-item">
                  <span>Items:</span>
                  <span className="summary-value">{items.length}</span>
                </div>
                <div className="summary-item">
                  <span>Unidades:</span>
                  <span className="summary-value">{items.reduce((sum, item) => sum + item.cantidad, 0)}</span>
                </div>
                <hr />
                <div className="summary-total">
                  <span>TOTAL:</span>
                  <span className="total-value">{formatearMoneda(calcularTotal())}</span>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <Button color="success" size="lg" onClick={registrarVenta} disabled={loading || items.length === 0}>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    {loading ? 'Registrando...' : 'Registrar Venta'}
                  </Button>
                  <Button tag={Link} to="/factura" color="secondary" disabled={loading}>
                    <FontAwesomeIcon icon={faTimes} className="me-2" />
                    Cancelar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FacturaNueva;
