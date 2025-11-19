package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Pago;
import com.mycompany.myapp.repository.PagoRepository;
import com.mycompany.myapp.service.PagoService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Pago}.
 */
@RestController
@RequestMapping("/api/pagos")
public class PagoResource {

    private static final Logger LOG = LoggerFactory.getLogger(PagoResource.class);

    private static final String ENTITY_NAME = "pago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoService pagoService;

    private final PagoRepository pagoRepository;

    public PagoResource(PagoService pagoService, PagoRepository pagoRepository) {
        this.pagoService = pagoService;
        this.pagoRepository = pagoRepository;
    }

    /**
     * {@code POST  /pagos} : Create a new pago.
     *
     * @param pago the pago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pago, or with status {@code 400 (Bad Request)} if the pago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Pago> createPago(@Valid @RequestBody Pago pago) throws URISyntaxException {
        LOG.debug("REST request to save Pago : {}", pago);
        if (pago.getId() != null) {
            throw new BadRequestAlertException("A new pago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        pago = pagoService.save(pago);
        return ResponseEntity.created(new URI("/api/pagos/" + pago.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, pago.getId().toString()))
            .body(pago);
    }

    /**
     * {@code PUT  /pagos/:id} : Updates an existing pago.
     *
     * @param id the id of the pago to save.
     * @param pago the pago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pago,
     * or with status {@code 400 (Bad Request)} if the pago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pago> updatePago(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Pago pago)
        throws URISyntaxException {
        LOG.debug("REST request to update Pago : {}, {}", id, pago);
        if (pago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        pago = pagoService.update(pago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pago.getId().toString()))
            .body(pago);
    }

    /**
     * {@code PATCH  /pagos/:id} : Partial updates given fields of an existing pago, field will ignore if it is null
     *
     * @param id the id of the pago to save.
     * @param pago the pago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pago,
     * or with status {@code 400 (Bad Request)} if the pago is not valid,
     * or with status {@code 404 (Not Found)} if the pago is not found,
     * or with status {@code 500 (Internal Server Error)} if the pago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pago> partialUpdatePago(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Pago pago
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Pago partially : {}, {}", id, pago);
        if (pago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pago> result = pagoService.partialUpdate(pago);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pago.getId().toString())
        );
    }

    /**
     * {@code GET  /pagos} : get all the pagos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Pago>> getAllPagos(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Pagos");
        Page<Pago> page = pagoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pagos/:id} : get the "id" pago.
     *
     * @param id the id of the pago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pago> getPago(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Pago : {}", id);
        Optional<Pago> pago = pagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pago);
    }

    /**
     * {@code DELETE  /pagos/:id} : delete the "id" pago.
     *
     * @param id the id of the pago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePago(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Pago : {}", id);
        pagoService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
