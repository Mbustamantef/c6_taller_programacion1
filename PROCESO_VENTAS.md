# Sistema de Ventas - Proceso de Facturación

## Descripción

Este módulo implementa el proceso completo de registro y gestión de ventas/facturas en el sistema. Permite:

- Calcular el total de una venta antes de registrarla
- Registrar una nueva venta con sus detalles
- Listar todas las ventas registradas
- Consultar una venta específica por su ID

## Arquitectura

### Componentes Backend

1. **DTOs (Data Transfer Objects)**

   - `VentaDetalleDTO`: Representa un item/detalle de la venta
   - `VentaRequestDTO`: DTO para crear una nueva venta
   - `VentaResponseDTO`: DTO para responder con los datos de una venta

2. **Service**

   - `VentaService`: Contiene la lógica de negocio del proceso de ventas

3. **Resource/Controller**
   - `VentaResource`: Expone los endpoints REST para el proceso de ventas

### Validaciones Implementadas

- `@NotNull`: Cliente y productos son obligatorios
- `@NotEmpty`: Debe haber al menos un item en la venta
- `@Min`: Cantidad y precio deben ser positivos
- Validación de existencia de cliente y productos
- Validación de productos activos

## API Endpoints

### 1. Calcular Total (sin registrar)

```http
POST /api/ventas/calcular
Content-Type: application/json

{
  "clienteId": 1,
  "items": [
    {
      "productoId": 1,
      "cantidad": 2,
      "precioUnitario": 50000
    }
  ]
}
```

**Respuesta:**

```json
100000.0
```

### 2. Registrar Venta

```http
POST /api/ventas
Content-Type: application/json

{
  "clienteId": 1,
  "items": [
    {
      "productoId": 1,
      "cantidad": 2,
      "precioUnitario": 50000
    },
    {
      "productoId": 2,
      "cantidad": 1,
      "precioUnitario": 75000
    }
  ]
}
```

**Respuesta:**

```json
{
  "id": 1,
  "clienteId": 1,
  "clienteNombre": "Juan Pérez",
  "total": 175000.0,
  "fecha": "2025-12-15",
  "estado": "PENDIENTE",
  "items": [
    {
      "productoId": 1,
      "productoNombre": "Laptop HP",
      "cantidad": 2,
      "precioUnitario": 50000.0,
      "subtotal": 100000.0
    },
    {
      "productoId": 2,
      "productoNombre": "Mouse Inalámbrico",
      "cantidad": 1,
      "precioUnitario": 75000.0,
      "subtotal": 75000.0
    }
  ]
}
```

### 3. Listar Ventas

```http
GET /api/ventas
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "clienteId": 1,
    "clienteNombre": "Juan Pérez",
    "total": 175000.00,
    "fecha": "2025-12-15",
    "estado": "PENDIENTE",
    "items": [...]
  }
]
```

### 4. Obtener Venta por ID

```http
GET /api/ventas/1
```

**Respuesta:**

```json
{
  "id": 1,
  "clienteId": 1,
  "clienteNombre": "Juan Pérez",
  "total": 175000.00,
  "fecha": "2025-12-15",
  "estado": "PENDIENTE",
  "items": [...]
}
```

## Cómo Probar

### Usando cURL

1. **Calcular total:**

```bash
curl -X POST http://localhost:8080/api/ventas/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "items": [
      {"productoId": 1, "cantidad": 2, "precioUnitario": 50000}
    ]
  }'
```

2. **Registrar venta:**

```bash
curl -X POST http://localhost:8080/api/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "items": [
      {"productoId": 1, "cantidad": 2, "precioUnitario": 50000},
      {"productoId": 2, "cantidad": 1, "precioUnitario": 75000}
    ]
  }'
```

3. **Listar ventas:**

```bash
curl http://localhost:8080/api/ventas
```

4. **Obtener venta específica:**

```bash
curl http://localhost:8080/api/ventas/1
```

### Usando Postman o Insomnia

1. Importa la colección con los endpoints listados arriba
2. Asegúrate de tener:
   - Al menos un cliente registrado en la BD
   - Al menos un producto activo en la BD
3. Ejecuta los requests en el orden sugerido

### Usando la Interfaz Web

1. Inicia la aplicación: `./mvnw` o `npm run start`
2. Navega a: `http://localhost:8080/`
3. Ve a la sección "Facturas"
4. Haz clic en "Nueva Factura"
5. Selecciona un cliente
6. Agrega productos con sus cantidades
7. El sistema calculará automáticamente el total
8. Guarda la factura

## Modelo de Datos

### Factura (Venta)

- id: Long
- fecha: LocalDate
- total: BigDecimal
- estado: String
- cliente: Cliente (ManyToOne)
- detalles: Set<DetalleFactura> (OneToMany)

### DetalleFactura

- id: Long
- cantidad: Integer
- precioUnitario: BigDecimal
- subtotal: BigDecimal
- producto: Producto (ManyToOne)
- factura: Factura (ManyToOne)

## Flujo del Proceso

1. Usuario selecciona un cliente
2. Usuario agrega productos uno por uno
3. Para cada producto especifica cantidad
4. Sistema calcula subtotal = cantidad × precioUnitario
5. Sistema calcula total = suma de todos los subtotales
6. Usuario confirma y registra la venta
7. Sistema crea la factura con estado "PENDIENTE"
8. Sistema guarda la factura y sus detalles en la BD

## Mensajes de Error

- **Cliente no encontrado**: "Cliente no encontrado con ID: {id}"
- **Producto no encontrado**: "Producto no encontrado con ID: {id}"
- **Producto inactivo**: "El producto '{nombre}' no está activo"
- **Venta no encontrada**: "Venta no encontrada con ID: {id}"
- **Validación**: Mensajes específicos por campo inválido

## Moneda

El sistema utiliza **Guaraníes paraguayos (₲)** como moneda principal.

## Estados de Factura

- **PENDIENTE**: Factura creada, pendiente de pago
- **PAGADA**: Factura completamente pagada (implementación futura)
- **CANCELADA**: Factura anulada (implementación futura)

## Notas Técnicas

- Las transacciones son atómicas (@Transactional)
- Se valida la existencia de entidades relacionadas antes de guardar
- Se valida que los productos estén activos
- Los detalles se guardan con cascada junto con la factura
- Los logs se registran en nivel DEBUG e INFO

## Próximas Mejoras

- [ ] Implementar proceso de pagos
- [ ] Agregar estado de stock y validar disponibilidad
- [ ] Permitir edición de facturas pendientes
- [ ] Generar PDF de factura
- [ ] Reportes de ventas por período
- [ ] Dashboard con estadísticas de ventas
