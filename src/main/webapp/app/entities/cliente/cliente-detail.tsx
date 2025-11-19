import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './cliente.reducer';

export const ClienteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const clienteEntity = useAppSelector(state => state.cliente.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="clienteDetailsHeading">Cliente</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{clienteEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{clienteEntity.nombre}</dd>
          <dt>
            <span id="rucCi">Ruc Ci</span>
          </dt>
          <dd>{clienteEntity.rucCi}</dd>
          <dt>
            <span id="telefono">Telefono</span>
          </dt>
          <dd>{clienteEntity.telefono}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{clienteEntity.email}</dd>
          <dt>
            <span id="direccion">Direccion</span>
          </dt>
          <dd>{clienteEntity.direccion}</dd>
          <dt>
            <span id="fechaAlta">Fecha Alta</span>
          </dt>
          <dd>
            {clienteEntity.fechaAlta ? <TextFormat value={clienteEntity.fechaAlta} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/cliente" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cliente/${clienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClienteDetail;
