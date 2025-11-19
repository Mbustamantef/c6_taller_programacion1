import cliente from 'app/entities/cliente/cliente.reducer';
import producto from 'app/entities/producto/producto.reducer';
import factura from 'app/entities/factura/factura.reducer';
import detalleFactura from 'app/entities/detalle-factura/detalle-factura.reducer';
import pago from 'app/entities/pago/pago.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  cliente,
  producto,
  factura,
  detalleFactura,
  pago,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
