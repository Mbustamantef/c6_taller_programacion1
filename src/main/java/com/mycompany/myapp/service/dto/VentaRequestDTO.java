package com.mycompany.myapp.service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * DTO para crear una nueva venta/factura
 */
public class VentaRequestDTO {

    @NotNull(message = "El ID del cliente es requerido")
    private Long clienteId;

    @NotEmpty(message = "Debe incluir al menos un item en la venta")
    @Valid
    private List<VentaDetalleDTO> items;

    // Constructors
    public VentaRequestDTO() {}

    public VentaRequestDTO(Long clienteId, List<VentaDetalleDTO> items) {
        this.clienteId = clienteId;
        this.items = items;
    }

    // Getters and Setters
    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public List<VentaDetalleDTO> getItems() {
        return items;
    }

    public void setItems(List<VentaDetalleDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "VentaRequestDTO{" + "clienteId=" + clienteId + ", items=" + items + '}';
    }
}
