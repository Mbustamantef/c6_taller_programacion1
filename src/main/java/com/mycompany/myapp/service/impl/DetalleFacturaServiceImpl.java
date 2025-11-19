package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.DetalleFactura;
import com.mycompany.myapp.repository.DetalleFacturaRepository;
import com.mycompany.myapp.service.DetalleFacturaService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.DetalleFactura}.
 */
@Service
@Transactional
public class DetalleFacturaServiceImpl implements DetalleFacturaService {

    private static final Logger LOG = LoggerFactory.getLogger(DetalleFacturaServiceImpl.class);

    private final DetalleFacturaRepository detalleFacturaRepository;

    public DetalleFacturaServiceImpl(DetalleFacturaRepository detalleFacturaRepository) {
        this.detalleFacturaRepository = detalleFacturaRepository;
    }

    @Override
    public DetalleFactura save(DetalleFactura detalleFactura) {
        LOG.debug("Request to save DetalleFactura : {}", detalleFactura);
        return detalleFacturaRepository.save(detalleFactura);
    }

    @Override
    public DetalleFactura update(DetalleFactura detalleFactura) {
        LOG.debug("Request to update DetalleFactura : {}", detalleFactura);
        return detalleFacturaRepository.save(detalleFactura);
    }

    @Override
    public Optional<DetalleFactura> partialUpdate(DetalleFactura detalleFactura) {
        LOG.debug("Request to partially update DetalleFactura : {}", detalleFactura);

        return detalleFacturaRepository
            .findById(detalleFactura.getId())
            .map(existingDetalleFactura -> {
                if (detalleFactura.getCantidad() != null) {
                    existingDetalleFactura.setCantidad(detalleFactura.getCantidad());
                }
                if (detalleFactura.getPrecioUnitario() != null) {
                    existingDetalleFactura.setPrecioUnitario(detalleFactura.getPrecioUnitario());
                }
                if (detalleFactura.getSubtotal() != null) {
                    existingDetalleFactura.setSubtotal(detalleFactura.getSubtotal());
                }

                return existingDetalleFactura;
            })
            .map(detalleFacturaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DetalleFactura> findAll(Pageable pageable) {
        LOG.debug("Request to get all DetalleFacturas");
        return detalleFacturaRepository.findAll(pageable);
    }

    public Page<DetalleFactura> findAllWithEagerRelationships(Pageable pageable) {
        return detalleFacturaRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DetalleFactura> findOne(Long id) {
        LOG.debug("Request to get DetalleFactura : {}", id);
        return detalleFacturaRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete DetalleFactura : {}", id);
        detalleFacturaRepository.deleteById(id);
    }
}
