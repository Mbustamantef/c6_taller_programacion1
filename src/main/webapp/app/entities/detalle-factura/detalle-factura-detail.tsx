import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './detalle-factura.reducer';

export const DetalleFacturaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const detalleFacturaEntity = useAppSelector(state => state.detalleFactura.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="detalleFacturaDetailsHeading">Detalle Factura</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{detalleFacturaEntity.id}</dd>
          <dt>
            <span id="cantidad">Cantidad</span>
          </dt>
          <dd>{detalleFacturaEntity.cantidad}</dd>
          <dt>
            <span id="precioUnitario">Precio Unitario</span>
          </dt>
          <dd>{detalleFacturaEntity.precioUnitario}</dd>
          <dt>
            <span id="subtotal">Subtotal</span>
          </dt>
          <dd>{detalleFacturaEntity.subtotal}</dd>
          <dt>Producto</dt>
          <dd>{detalleFacturaEntity.producto ? detalleFacturaEntity.producto.nombre : ''}</dd>
          <dt>Factura</dt>
          <dd>{detalleFacturaEntity.factura ? detalleFacturaEntity.factura.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/detalle-factura" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/detalle-factura/${detalleFacturaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DetalleFacturaDetail;
