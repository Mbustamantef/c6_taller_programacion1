package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Pago;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Pago}.
 */
public interface PagoService {
    /**
     * Save a pago.
     *
     * @param pago the entity to save.
     * @return the persisted entity.
     */
    Pago save(Pago pago);

    /**
     * Updates a pago.
     *
     * @param pago the entity to update.
     * @return the persisted entity.
     */
    Pago update(Pago pago);

    /**
     * Partially updates a pago.
     *
     * @param pago the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Pago> partialUpdate(Pago pago);

    /**
     * Get all the pagos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pago> findAll(Pageable pageable);

    /**
     * Get the "id" pago.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pago> findOne(Long id);

    /**
     * Delete the "id" pago.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
