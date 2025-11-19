package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.DetalleFactura;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.DetalleFactura}.
 */
public interface DetalleFacturaService {
    /**
     * Save a detalleFactura.
     *
     * @param detalleFactura the entity to save.
     * @return the persisted entity.
     */
    DetalleFactura save(DetalleFactura detalleFactura);

    /**
     * Updates a detalleFactura.
     *
     * @param detalleFactura the entity to update.
     * @return the persisted entity.
     */
    DetalleFactura update(DetalleFactura detalleFactura);

    /**
     * Partially updates a detalleFactura.
     *
     * @param detalleFactura the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DetalleFactura> partialUpdate(DetalleFactura detalleFactura);

    /**
     * Get all the detalleFacturas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DetalleFactura> findAll(Pageable pageable);

    /**
     * Get all the detalleFacturas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DetalleFactura> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" detalleFactura.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DetalleFactura> findOne(Long id);

    /**
     * Delete the "id" detalleFactura.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
