import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Pago from './pago';
import PagoDetail from './pago-detail';
import PagoUpdate from './pago-update';
import PagoDeleteDialog from './pago-delete-dialog';

const PagoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pago />} />
    <Route path="new" element={<PagoUpdate />} />
    <Route path=":id">
      <Route index element={<PagoDetail />} />
      <Route path="edit" element={<PagoUpdate />} />
      <Route path="delete" element={<PagoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PagoRoutes;
