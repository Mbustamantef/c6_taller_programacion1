package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DetalleFacturaTestSamples.*;
import static com.mycompany.myapp.domain.FacturaTestSamples.*;
import static com.mycompany.myapp.domain.ProductoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DetalleFacturaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleFactura.class);
        DetalleFactura detalleFactura1 = getDetalleFacturaSample1();
        DetalleFactura detalleFactura2 = new DetalleFactura();
        assertThat(detalleFactura1).isNotEqualTo(detalleFactura2);

        detalleFactura2.setId(detalleFactura1.getId());
        assertThat(detalleFactura1).isEqualTo(detalleFactura2);

        detalleFactura2 = getDetalleFacturaSample2();
        assertThat(detalleFactura1).isNotEqualTo(detalleFactura2);
    }

    @Test
    void productoTest() {
        DetalleFactura detalleFactura = getDetalleFacturaRandomSampleGenerator();
        Producto productoBack = getProductoRandomSampleGenerator();

        detalleFactura.setProducto(productoBack);
        assertThat(detalleFactura.getProducto()).isEqualTo(productoBack);

        detalleFactura.producto(null);
        assertThat(detalleFactura.getProducto()).isNull();
    }

    @Test
    void facturaTest() {
        DetalleFactura detalleFactura = getDetalleFacturaRandomSampleGenerator();
        Factura facturaBack = getFacturaRandomSampleGenerator();

        detalleFactura.setFactura(facturaBack);
        assertThat(detalleFactura.getFactura()).isEqualTo(facturaBack);

        detalleFactura.factura(null);
        assertThat(detalleFactura.getFactura()).isNull();
    }
}
