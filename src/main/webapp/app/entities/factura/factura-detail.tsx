import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './factura.reducer';

export const FacturaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const facturaEntity = useAppSelector(state => state.factura.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="facturaDetailsHeading">Factura</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{facturaEntity.id}</dd>
          <dt>
            <span id="fecha">Fecha</span>
          </dt>
          <dd>{facturaEntity.fecha ? <TextFormat value={facturaEntity.fecha} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="total">Total</span>
          </dt>
          <dd>{facturaEntity.total}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{facturaEntity.estado}</dd>
          <dt>Cliente</dt>
          <dd>{facturaEntity.cliente ? facturaEntity.cliente.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/factura" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/factura/${facturaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FacturaDetail;
