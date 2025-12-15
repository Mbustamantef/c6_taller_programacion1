package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Cabecera de la venta
 */
@Schema(description = "Cabecera de la venta")
@Entity
@Table(name = "factura")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Factura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "total", precision = 21, scale = 2, nullable = false)
    private BigDecimal total;

    @NotNull
    @Column(name = "estado", nullable = false)
    private String estado;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = { "producto", "factura" }, allowSetters = true)
    private Set<DetalleFactura> detalles = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = { "factura" }, allowSetters = true)
    private Set<Pago> pagos = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Factura id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Factura fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public BigDecimal getTotal() {
        return this.total;
    }

    public Factura total(BigDecimal total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getEstado() {
        return this.estado;
    }

    public Factura estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<DetalleFactura> getDetalles() {
        return this.detalles;
    }

    public void setDetalles(Set<DetalleFactura> detalleFacturas) {
        if (this.detalles != null) {
            this.detalles.forEach(i -> i.setFactura(null));
        }
        if (detalleFacturas != null) {
            detalleFacturas.forEach(i -> i.setFactura(this));
        }
        this.detalles = detalleFacturas;
    }

    public Factura detalles(Set<DetalleFactura> detalleFacturas) {
        this.setDetalles(detalleFacturas);
        return this;
    }

    public Factura addDetalles(DetalleFactura detalleFactura) {
        this.detalles.add(detalleFactura);
        detalleFactura.setFactura(this);
        return this;
    }

    public Factura removeDetalles(DetalleFactura detalleFactura) {
        this.detalles.remove(detalleFactura);
        detalleFactura.setFactura(null);
        return this;
    }

    public Set<Pago> getPagos() {
        return this.pagos;
    }

    public void setPagos(Set<Pago> pagos) {
        if (this.pagos != null) {
            this.pagos.forEach(i -> i.setFactura(null));
        }
        if (pagos != null) {
            pagos.forEach(i -> i.setFactura(this));
        }
        this.pagos = pagos;
    }

    public Factura pagos(Set<Pago> pagos) {
        this.setPagos(pagos);
        return this;
    }

    public Factura addPagos(Pago pago) {
        this.pagos.add(pago);
        pago.setFactura(this);
        return this;
    }

    public Factura removePagos(Pago pago) {
        this.pagos.remove(pago);
        pago.setFactura(null);
        return this;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Factura cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Factura)) {
            return false;
        }
        return getId() != null && getId().equals(((Factura) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Factura{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", total=" + getTotal() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
