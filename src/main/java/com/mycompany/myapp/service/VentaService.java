package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Cliente;
import com.mycompany.myapp.domain.DetalleFactura;
import com.mycompany.myapp.domain.Factura;
import com.mycompany.myapp.domain.Producto;
import com.mycompany.myapp.repository.ClienteRepository;
import com.mycompany.myapp.repository.FacturaRepository;
import com.mycompany.myapp.repository.ProductoRepository;
import com.mycompany.myapp.service.dto.VentaDetalleDTO;
import com.mycompany.myapp.service.dto.VentaRequestDTO;
import com.mycompany.myapp.service.dto.VentaResponseDTO;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service para gestionar el proceso de ventas/facturas
 */
@Service
@Transactional
public class VentaService {

    private static final Logger log = LoggerFactory.getLogger(VentaService.class);

    private final FacturaRepository facturaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public VentaService(FacturaRepository facturaRepository, ClienteRepository clienteRepository, ProductoRepository productoRepository) {
        this.facturaRepository = facturaRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    /**
     * Calcula el total de una venta sin registrarla
     * @param request DTO con los datos de la venta
     * @return El total calculado
     */
    public BigDecimal calcularTotal(VentaRequestDTO request) {
        log.debug("Calculando total para venta con {} items", request.getItems().size());

        return request
            .getItems()
            .stream()
            .map(item -> item.getPrecioUnitario().multiply(BigDecimal.valueOf(item.getCantidad())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Registra una nueva venta/factura en la base de datos
     * @param request DTO con los datos de la venta
     * @return DTO con los datos de la venta registrada
     */
    @Transactional
    public VentaResponseDTO registrarVenta(VentaRequestDTO request) {
        log.debug("Registrando venta para cliente ID: {}", request.getClienteId());

        // Validar que el cliente existe
        Cliente cliente = clienteRepository
            .findById(request.getClienteId())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + request.getClienteId()));

        // Crear la factura
        Factura factura = new Factura();
        factura.setCliente(cliente);
        factura.setFecha(LocalDate.now());
        factura.setEstado("PENDIENTE");

        BigDecimal total = BigDecimal.ZERO;

        // Procesar cada item
        for (VentaDetalleDTO itemDTO : request.getItems()) {
            // Validar que el producto existe
            Producto producto = productoRepository
                .findById(itemDTO.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + itemDTO.getProductoId()));

            // Validar que el producto está activo
            if (!producto.getActivo()) {
                throw new RuntimeException("El producto '" + producto.getNombre() + "' no está activo");
            }

            // Calcular subtotal
            BigDecimal subtotal = itemDTO.getPrecioUnitario().multiply(BigDecimal.valueOf(itemDTO.getCantidad()));
            total = total.add(subtotal);

            // Crear detalle
            DetalleFactura detalle = new DetalleFactura();
            detalle.setProducto(producto);
            detalle.setCantidad(itemDTO.getCantidad());
            detalle.setPrecioUnitario(itemDTO.getPrecioUnitario());
            detalle.setSubtotal(subtotal);
            detalle.setFactura(factura);

            // Agregar detalle a la factura
            factura.getDetalles().add(detalle);
        }

        factura.setTotal(total);

        // Guardar factura con cascade para los detalles
        Factura facturaGuardada = facturaRepository.save(factura);

        log.info("Venta registrada exitosamente. ID: {}, Total: {}", facturaGuardada.getId(), facturaGuardada.getTotal());

        return mapToResponse(facturaGuardada);
    }

    /**
     * Lista todas las ventas registradas
     * @return Lista de DTOs con las ventas
     */
    @Transactional(readOnly = true)
    public List<VentaResponseDTO> listarVentas() {
        log.debug("Listando todas las ventas");
        return facturaRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    /**
     * Obtiene una venta por su ID
     * @param id ID de la venta
     * @return DTO con los datos de la venta
     */
    @Transactional(readOnly = true)
    public VentaResponseDTO obtenerPorId(Long id) {
        log.debug("Obteniendo venta con ID: {}", id);

        Factura factura = facturaRepository.findById(id).orElseThrow(() -> new RuntimeException("Venta no encontrada con ID: " + id));

        return mapToResponse(factura);
    }

    /**
     * Mapea una entidad Factura a un DTO de respuesta
     */
    private VentaResponseDTO mapToResponse(Factura factura) {
        VentaResponseDTO dto = new VentaResponseDTO();
        dto.setId(factura.getId());
        dto.setClienteId(factura.getCliente().getId());
        dto.setClienteNombre(factura.getCliente().getNombre());
        dto.setTotal(factura.getTotal());
        dto.setFecha(factura.getFecha());
        dto.setEstado(factura.getEstado());

        // Mapear detalles
        List<VentaDetalleDTO> items = factura
            .getDetalles()
            .stream()
            .map(detalle -> {
                VentaDetalleDTO itemDTO = new VentaDetalleDTO();
                itemDTO.setProductoId(detalle.getProducto().getId());
                itemDTO.setProductoNombre(detalle.getProducto().getNombre());
                itemDTO.setCantidad(detalle.getCantidad());
                itemDTO.setPrecioUnitario(detalle.getPrecioUnitario());
                itemDTO.setSubtotal(detalle.getSubtotal());
                return itemDTO;
            })
            .collect(Collectors.toList());

        dto.setItems(items);
        return dto;
    }
}
