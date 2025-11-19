import React from 'react';
// eslint-disable-line

import MenuItem from 'app/shared/layout/menus/menu-item'; // eslint-disable-line

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/cliente">
        Cliente
      </MenuItem>
      <MenuItem icon="asterisk" to="/producto">
        Producto
      </MenuItem>
      <MenuItem icon="asterisk" to="/factura">
        Factura
      </MenuItem>
      <MenuItem icon="asterisk" to="/detalle-factura">
        Detalle Factura
      </MenuItem>
      <MenuItem icon="asterisk" to="/pago">
        Pago
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
