package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Pago;
import com.mycompany.myapp.repository.PagoRepository;
import com.mycompany.myapp.service.PagoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Pago}.
 */
@Service
@Transactional
public class PagoServiceImpl implements PagoService {

    private static final Logger LOG = LoggerFactory.getLogger(PagoServiceImpl.class);

    private final PagoRepository pagoRepository;

    public PagoServiceImpl(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    @Override
    public Pago save(Pago pago) {
        LOG.debug("Request to save Pago : {}", pago);
        return pagoRepository.save(pago);
    }

    @Override
    public Pago update(Pago pago) {
        LOG.debug("Request to update Pago : {}", pago);
        return pagoRepository.save(pago);
    }

    @Override
    public Optional<Pago> partialUpdate(Pago pago) {
        LOG.debug("Request to partially update Pago : {}", pago);

        return pagoRepository
            .findById(pago.getId())
            .map(existingPago -> {
                if (pago.getFechaPago() != null) {
                    existingPago.setFechaPago(pago.getFechaPago());
                }
                if (pago.getMonto() != null) {
                    existingPago.setMonto(pago.getMonto());
                }
                if (pago.getMetodoPago() != null) {
                    existingPago.setMetodoPago(pago.getMetodoPago());
                }

                return existingPago;
            })
            .map(pagoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Pago> findAll(Pageable pageable) {
        LOG.debug("Request to get all Pagos");
        return pagoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pago> findOne(Long id) {
        LOG.debug("Request to get Pago : {}", id);
        return pagoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Pago : {}", id);
        pagoRepository.deleteById(id);
    }
}
