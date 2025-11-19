package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ClienteTestSamples.*;
import static com.mycompany.myapp.domain.DetalleFacturaTestSamples.*;
import static com.mycompany.myapp.domain.FacturaTestSamples.*;
import static com.mycompany.myapp.domain.PagoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FacturaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Factura.class);
        Factura factura1 = getFacturaSample1();
        Factura factura2 = new Factura();
        assertThat(factura1).isNotEqualTo(factura2);

        factura2.setId(factura1.getId());
        assertThat(factura1).isEqualTo(factura2);

        factura2 = getFacturaSample2();
        assertThat(factura1).isNotEqualTo(factura2);
    }

    @Test
    void detallesTest() {
        Factura factura = getFacturaRandomSampleGenerator();
        DetalleFactura detalleFacturaBack = getDetalleFacturaRandomSampleGenerator();

        factura.addDetalles(detalleFacturaBack);
        assertThat(factura.getDetalles()).containsOnly(detalleFacturaBack);
        assertThat(detalleFacturaBack.getFactura()).isEqualTo(factura);

        factura.removeDetalles(detalleFacturaBack);
        assertThat(factura.getDetalles()).doesNotContain(detalleFacturaBack);
        assertThat(detalleFacturaBack.getFactura()).isNull();

        factura.detalles(new HashSet<>(Set.of(detalleFacturaBack)));
        assertThat(factura.getDetalles()).containsOnly(detalleFacturaBack);
        assertThat(detalleFacturaBack.getFactura()).isEqualTo(factura);

        factura.setDetalles(new HashSet<>());
        assertThat(factura.getDetalles()).doesNotContain(detalleFacturaBack);
        assertThat(detalleFacturaBack.getFactura()).isNull();
    }

    @Test
    void pagosTest() {
        Factura factura = getFacturaRandomSampleGenerator();
        Pago pagoBack = getPagoRandomSampleGenerator();

        factura.addPagos(pagoBack);
        assertThat(factura.getPagos()).containsOnly(pagoBack);
        assertThat(pagoBack.getFactura()).isEqualTo(factura);

        factura.removePagos(pagoBack);
        assertThat(factura.getPagos()).doesNotContain(pagoBack);
        assertThat(pagoBack.getFactura()).isNull();

        factura.pagos(new HashSet<>(Set.of(pagoBack)));
        assertThat(factura.getPagos()).containsOnly(pagoBack);
        assertThat(pagoBack.getFactura()).isEqualTo(factura);

        factura.setPagos(new HashSet<>());
        assertThat(factura.getPagos()).doesNotContain(pagoBack);
        assertThat(pagoBack.getFactura()).isNull();
    }

    @Test
    void clienteTest() {
        Factura factura = getFacturaRandomSampleGenerator();
        Cliente clienteBack = getClienteRandomSampleGenerator();

        factura.setCliente(clienteBack);
        assertThat(factura.getCliente()).isEqualTo(clienteBack);

        factura.cliente(null);
        assertThat(factura.getCliente()).isNull();
    }
}
