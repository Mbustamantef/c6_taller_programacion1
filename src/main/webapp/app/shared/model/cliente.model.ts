import dayjs from 'dayjs';

export interface ICliente {
  id?: number;
  nombre?: string;
  rucCi?: string | null;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
  fechaAlta?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<ICliente> = {};
