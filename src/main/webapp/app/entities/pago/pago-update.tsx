import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getFacturas } from 'app/entities/factura/factura.reducer';
import { createEntity, getEntity, updateEntity } from './pago.reducer';

export const PagoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const facturas = useAppSelector(state => state.factura.entities);
  const pagoEntity = useAppSelector(state => state.pago.entity);
  const loading = useAppSelector(state => state.pago.loading);
  const updating = useAppSelector(state => state.pago.updating);
  const updateSuccess = useAppSelector(state => state.pago.updateSuccess);

  const handleClose = () => {
    navigate('/pago');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getFacturas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.monto !== undefined && typeof values.monto !== 'number') {
      values.monto = Number(values.monto);
    }

    const entity = {
      ...pagoEntity,
      ...values,
      factura: facturas.find(it => it.id.toString() === values.factura?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pagoEntity,
          factura: pagoEntity?.factura?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="taller1App.pago.home.createOrEditLabel" data-cy="PagoCreateUpdateHeading">
            Create or edit a Pago
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="pago-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Fecha Pago"
                id="pago-fechaPago"
                name="fechaPago"
                data-cy="fechaPago"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Monto"
                id="pago-monto"
                name="monto"
                data-cy="monto"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Metodo Pago"
                id="pago-metodoPago"
                name="metodoPago"
                data-cy="metodoPago"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="pago-factura" name="factura" data-cy="factura" label="Factura" type="select">
                <option value="" key="0" />
                {facturas
                  ? facturas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pago" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PagoUpdate;
