package com.mycompany.myapp.service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO para responder con los datos de una venta/factura
 */
public class VentaResponseDTO {

    private Long id;
    private Long clienteId;
    private String clienteNombre;
    private BigDecimal total;
    private LocalDate fecha;
    private String estado;
    private List<VentaDetalleDTO> items;

    // Constructors
    public VentaResponseDTO() {}

    public VentaResponseDTO(Long id, Long clienteId, String clienteNombre, BigDecimal total, LocalDate fecha, String estado) {
        this.id = id;
        this.clienteId = clienteId;
        this.clienteNombre = clienteNombre;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<VentaDetalleDTO> getItems() {
        return items;
    }

    public void setItems(List<VentaDetalleDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return (
            "VentaResponseDTO{" +
            "id=" +
            id +
            ", clienteId=" +
            clienteId +
            ", clienteNombre='" +
            clienteNombre +
            '\'' +
            ", total=" +
            total +
            ", fecha=" +
            fecha +
            ", estado='" +
            estado +
            '\'' +
            ", items=" +
            items +
            '}'
        );
    }
}
