import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Cliente from './cliente';
import Producto from './producto';
import Factura from './factura';
import DetalleFactura from './detalle-factura';
import Pago from './pago';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="cliente/*" element={<Cliente />} />
        <Route path="producto/*" element={<Producto />} />
        <Route path="factura/*" element={<Factura />} />
        <Route path="detalle-factura/*" element={<DetalleFactura />} />
        <Route path="pago/*" element={<Pago />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
