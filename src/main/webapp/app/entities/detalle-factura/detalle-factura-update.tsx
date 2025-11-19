import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getProductos } from 'app/entities/producto/producto.reducer';
import { getEntities as getFacturas } from 'app/entities/factura/factura.reducer';
import { createEntity, getEntity, updateEntity } from './detalle-factura.reducer';

export const DetalleFacturaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const productos = useAppSelector(state => state.producto.entities);
  const facturas = useAppSelector(state => state.factura.entities);
  const detalleFacturaEntity = useAppSelector(state => state.detalleFactura.entity);
  const loading = useAppSelector(state => state.detalleFactura.loading);
  const updating = useAppSelector(state => state.detalleFactura.updating);
  const updateSuccess = useAppSelector(state => state.detalleFactura.updateSuccess);

  const handleClose = () => {
    navigate('/detalle-factura');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getProductos({}));
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
    if (values.cantidad !== undefined && typeof values.cantidad !== 'number') {
      values.cantidad = Number(values.cantidad);
    }
    if (values.precioUnitario !== undefined && typeof values.precioUnitario !== 'number') {
      values.precioUnitario = Number(values.precioUnitario);
    }
    if (values.subtotal !== undefined && typeof values.subtotal !== 'number') {
      values.subtotal = Number(values.subtotal);
    }

    const entity = {
      ...detalleFacturaEntity,
      ...values,
      producto: productos.find(it => it.id.toString() === values.producto?.toString()),
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
          ...detalleFacturaEntity,
          producto: detalleFacturaEntity?.producto?.id,
          factura: detalleFacturaEntity?.factura?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="taller1App.detalleFactura.home.createOrEditLabel" data-cy="DetalleFacturaCreateUpdateHeading">
            Create or edit a Detalle Factura
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="detalle-factura-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Cantidad"
                id="detalle-factura-cantidad"
                name="cantidad"
                data-cy="cantidad"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Precio Unitario"
                id="detalle-factura-precioUnitario"
                name="precioUnitario"
                data-cy="precioUnitario"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Subtotal"
                id="detalle-factura-subtotal"
                name="subtotal"
                data-cy="subtotal"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField id="detalle-factura-producto" name="producto" data-cy="producto" label="Producto" type="select">
                <option value="" key="0" />
                {productos
                  ? productos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="detalle-factura-factura" name="factura" data-cy="factura" label="Factura" type="select">
                <option value="" key="0" />
                {facturas
                  ? facturas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/detalle-factura" replace color="info">
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

export default DetalleFacturaUpdate;
