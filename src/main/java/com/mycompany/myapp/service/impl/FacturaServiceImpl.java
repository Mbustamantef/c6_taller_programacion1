package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Factura;
import com.mycompany.myapp.repository.FacturaRepository;
import com.mycompany.myapp.service.FacturaService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Factura}.
 */
@Service
@Transactional
public class FacturaServiceImpl implements FacturaService {

    private static final Logger LOG = LoggerFactory.getLogger(FacturaServiceImpl.class);

    private final FacturaRepository facturaRepository;

    public FacturaServiceImpl(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    @Override
    public Factura save(Factura factura) {
        LOG.debug("Request to save Factura : {}", factura);
        return facturaRepository.save(factura);
    }

    @Override
    public Factura update(Factura factura) {
        LOG.debug("Request to update Factura : {}", factura);
        return facturaRepository.save(factura);
    }

    @Override
    public Optional<Factura> partialUpdate(Factura factura) {
        LOG.debug("Request to partially update Factura : {}", factura);

        return facturaRepository
            .findById(factura.getId())
            .map(existingFactura -> {
                if (factura.getFecha() != null) {
                    existingFactura.setFecha(factura.getFecha());
                }
                if (factura.getTotal() != null) {
                    existingFactura.setTotal(factura.getTotal());
                }
                if (factura.getEstado() != null) {
                    existingFactura.setEstado(factura.getEstado());
                }

                return existingFactura;
            })
            .map(facturaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Factura> findAll(Pageable pageable) {
        LOG.debug("Request to get all Facturas");
        return facturaRepository.findAll(pageable);
    }

    public Page<Factura> findAllWithEagerRelationships(Pageable pageable) {
        return facturaRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Factura> findOne(Long id) {
        LOG.debug("Request to get Factura : {}", id);
        return facturaRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Factura : {}", id);
        facturaRepository.deleteById(id);
    }
}
