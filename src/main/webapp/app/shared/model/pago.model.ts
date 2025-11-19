import dayjs from 'dayjs';
import { IFactura } from 'app/shared/model/factura.model';

export interface IPago {
  id?: number;
  fechaPago?: dayjs.Dayjs;
  monto?: number;
  metodoPago?: string;
  factura?: IFactura | null;
}

export const defaultValue: Readonly<IPago> = {};
