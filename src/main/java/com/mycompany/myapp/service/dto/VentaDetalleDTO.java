package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * DTO para representar un detalle de venta/factura
 */
public class VentaDetalleDTO {

    @NotNull(message = "El ID del producto es requerido")
    private Long productoId;

    private String productoNombre;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    @NotNull(message = "El precio unitario es requerido")
    @Min(value = 0, message = "El precio unitario debe ser positivo")
    private BigDecimal precioUnitario;

    private BigDecimal subtotal;

    // Constructors
    public VentaDetalleDTO() {}

    public VentaDetalleDTO(Long productoId, String productoNombre, Integer cantidad, BigDecimal precioUnitario) {
        this.productoId = productoId;
        this.productoNombre = productoNombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
    }

    // Getters and Setters
    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public String getProductoNombre() {
        return productoNombre;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    @Override
    public String toString() {
        return (
            "VentaDetalleDTO{" +
            "productoId=" +
            productoId +
            ", productoNombre='" +
            productoNombre +
            '\'' +
            ", cantidad=" +
            cantidad +
            ", precioUnitario=" +
            precioUnitario +
            ", subtotal=" +
            subtotal +
            '}'
        );
    }
}
