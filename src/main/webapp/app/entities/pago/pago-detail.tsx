import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pago.reducer';

export const PagoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pagoEntity = useAppSelector(state => state.pago.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pagoDetailsHeading">Pago</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{pagoEntity.id}</dd>
          <dt>
            <span id="fechaPago">Fecha Pago</span>
          </dt>
          <dd>{pagoEntity.fechaPago ? <TextFormat value={pagoEntity.fechaPago} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="monto">Monto</span>
          </dt>
          <dd>{pagoEntity.monto}</dd>
          <dt>
            <span id="metodoPago">Metodo Pago</span>
          </dt>
          <dd>{pagoEntity.metodoPago}</dd>
          <dt>Factura</dt>
          <dd>{pagoEntity.factura ? pagoEntity.factura.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/pago" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pago/${pagoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PagoDetail;
