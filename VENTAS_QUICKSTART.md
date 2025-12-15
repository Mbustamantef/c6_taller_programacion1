# Sistema de Ventas - Guía Rápida

## ✅ Implementación Completa

Se ha implementado el proceso completo de ventas/facturación con las siguientes características:

### Backend

- **DTOs creados:**

  - `VentaDetalleDTO.java` - Detalle de items
  - `VentaRequestDTO.java` - Request para crear ventas
  - `VentaResponseDTO.java` - Response con datos de ventas

- **Service:**

  - `VentaService.java` - Lógica de negocio completa

- **Controller:**
  - `VentaResource.java` - API REST con endpoints:
    - `POST /api/ventas/calcular` - Calcular total
    - `POST /api/ventas` - Registrar venta
    - `GET /api/ventas` - Listar ventas
    - `GET /api/ventas/{id}` - Obtener venta

### Frontend

- **Componente nuevo:**

  - `factura-nueva.tsx` - Interfaz moderna para crear facturas
  - `factura-nueva.scss` - Estilos modernos

- **Características:**
  - Selección de cliente desde dropdown
  - Selección de productos activos
  - Agregar/eliminar items dinámicamente
  - Cálculo automático de subtotales y total
  - Resumen en tiempo real
  - Formateo en Guaraníes (₲)
  - Diseño responsive y moderno

### Validaciones

✅ Cliente obligatorio (`@NotNull`)
✅ Al menos un item (`@NotEmpty`)
✅ Cantidad mínima 1 (`@Min`)
✅ Precio positivo (`@Min`)
✅ Validación de existencia de cliente
✅ Validación de existencia de productos
✅ Validación de productos activos

## 🚀 Cómo Usar

### 1. Compilar y ejecutar

```bash
./mvnw
```

O en desarrollo:

```bash
npm run start
```

### 2. Acceder a la aplicación

Abrir: `http://localhost:8080`

### 3. Crear una factura

1. Login (si es necesario)
2. Click en "Facturas" en el menú
3. Click en "Nueva Factura"
4. Seleccionar un cliente
5. Agregar productos:
   - Seleccionar producto
   - Ingresar cantidad
   - Click en "Agregar"
6. Revisar el resumen con el total
7. Click en "Registrar Venta"

## 📋 Requisitos Previos

Para usar el sistema de facturas, debes tener:

- ✅ Al menos un cliente registrado
- ✅ Al menos un producto activo

Si no tienes datos, puedes crearlos desde:

- **Clientes:** `/cliente/new`
- **Productos:** `/producto/new`

## 🔍 Probar con cURL

```bash
# Registrar una venta
curl -X POST http://localhost:8080/api/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "items": [
      {
        "productoId": 1,
        "cantidad": 2,
        "precioUnitario": 50000
      }
    ]
  }'

# Listar ventas
curl http://localhost:8080/api/ventas

# Obtener venta específica
curl http://localhost:8080/api/ventas/1
```

## 📖 Documentación Completa

Ver archivo: `PROCESO_VENTAS.md`

## 💾 Estructura de Archivos Creados

```
Backend:
├── src/main/java/com/mycompany/myapp/
│   ├── service/
│   │   ├── VentaService.java
│   │   └── dto/
│   │       ├── VentaDetalleDTO.java
│   │       ├── VentaRequestDTO.java
│   │       └── VentaResponseDTO.java
│   └── web/rest/
│       └── VentaResource.java

Frontend:
└── src/main/webapp/app/entities/factura/
    ├── factura-nueva.tsx
    ├── factura-nueva.scss
    └── index.tsx (modificado)

Documentación:
├── PROCESO_VENTAS.md
└── VENTAS_QUICKSTART.md (este archivo)
```

## 🎯 Estado del Proyecto

- ✅ Backend completamente funcional
- ✅ Frontend completamente funcional
- ✅ Validaciones implementadas
- ✅ Documentación completa
- ✅ Diseño moderno y responsive
- ✅ Integración completa front-back

## 🐛 Troubleshooting

### Error: "Cliente no encontrado"

**Solución:** Crear al menos un cliente en `/cliente/new`

### Error: "Producto no encontrado" o "Producto no está activo"

**Solución:** Verificar que el producto exista y esté marcado como activo

### No aparecen productos en el dropdown

**Solución:** Crear productos y asegurarse de marcar el checkbox "Producto activo"

### Error al compilar

**Solución:**

```bash
./mvnw clean
rm -rf target/webpack node_modules/.cache
./mvnw
```

## 📞 Contacto

Para dudas o problemas, revisar:

1. Este archivo (VENTAS_QUICKSTART.md)
2. Documentación completa (PROCESO_VENTAS.md)
3. Logs de la aplicación en consola
