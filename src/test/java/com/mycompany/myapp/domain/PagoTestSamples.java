package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PagoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Pago getPagoSample1() {
        return new Pago().id(1L).metodoPago("metodoPago1");
    }

    public static Pago getPagoSample2() {
        return new Pago().id(2L).metodoPago("metodoPago2");
    }

    public static Pago getPagoRandomSampleGenerator() {
        return new Pago().id(longCount.incrementAndGet()).metodoPago(UUID.randomUUID().toString());
    }
}
