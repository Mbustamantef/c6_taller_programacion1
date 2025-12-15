package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.VentaService;
import com.mycompany.myapp.service.dto.VentaRequestDTO;
import com.mycompany.myapp.service.dto.VentaResponseDTO;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;

/**
 * REST controller para gestionar el proceso de ventas/facturas
 */
@RestController
@RequestMapping("/api/ventas")
public class VentaResource {

    private static final Logger log = LoggerFactory.getLogger(VentaResource.class);
    private static final String ENTITY_NAME = "venta";

    private final VentaService ventaService;

    public VentaResource(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    /**
     * POST /api/ventas/calcular : Calcula el total de una venta sin registrarla
     *
     * @param request DTO con los datos de la venta
     * @return El total calculado
     */
    @PostMapping("/calcular")
    public ResponseEntity<BigDecimal> calcularTotal(@Valid @RequestBody VentaRequestDTO request) {
        log.debug("REST request to calculate total for venta: {}", request);

        BigDecimal total = ventaService.calcularTotal(request);

        return ResponseEntity.ok().body(total);
    }

    /**
     * POST /api/ventas : Registra una nueva venta/factura
     *
     * @param request DTO con los datos de la venta
     * @return ResponseEntity con el DTO de la venta creada
     * @throws URISyntaxException si la URI de Location no es correcta
     */
    @PostMapping
    public ResponseEntity<VentaResponseDTO> registrarVenta(@Valid @RequestBody VentaRequestDTO request) throws URISyntaxException {
        log.debug("REST request to save Venta: {}", request);

        VentaResponseDTO result = ventaService.registrarVenta(request);

        return ResponseEntity.created(new URI("/api/ventas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("taller1App", true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * GET /api/ventas : Lista todas las ventas
     *
     * @return Lista de ventas
     */
    @GetMapping
    public ResponseEntity<List<VentaResponseDTO>> listarVentas() {
        log.debug("REST request to get all Ventas");

        List<VentaResponseDTO> ventas = ventaService.listarVentas();

        return ResponseEntity.ok().body(ventas);
    }

    /**
     * GET /api/ventas/:id : Obtiene una venta por su ID
     *
     * @param id ID de la venta
     * @return ResponseEntity con el DTO de la venta
     */
    @GetMapping("/{id}")
    public ResponseEntity<VentaResponseDTO> obtenerVenta(@PathVariable("id") Long id) {
        log.debug("REST request to get Venta: {}", id);

        VentaResponseDTO venta = ventaService.obtenerPorId(id);

        return ResponseEntity.ok().body(venta);
    }
}
