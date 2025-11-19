import dayjs from 'dayjs';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IFactura {
  id?: number;
  fecha?: dayjs.Dayjs;
  total?: number;
  estado?: string;
  cliente?: ICliente | null;
}

export const defaultValue: Readonly<IFactura> = {};
