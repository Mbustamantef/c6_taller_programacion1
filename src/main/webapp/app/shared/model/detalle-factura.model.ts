import { IProducto } from 'app/shared/model/producto.model';
import { IFactura } from 'app/shared/model/factura.model';

export interface IDetalleFactura {
  id?: number;
  cantidad?: number;
  precioUnitario?: number;
  subtotal?: number;
  producto?: IProducto | null;
  factura?: IFactura | null;
}

export const defaultValue: Readonly<IDetalleFactura> = {};
