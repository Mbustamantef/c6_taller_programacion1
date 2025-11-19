export interface IProducto {
  id?: number;
  nombre?: string;
  descripcion?: string | null;
  precioUnitario?: number;
  activo?: boolean;
}

export const defaultValue: Readonly<IProducto> = {
  activo: false,
};
