package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.DetalleFacturaAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static com.mycompany.myapp.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.DetalleFactura;
import com.mycompany.myapp.repository.DetalleFacturaRepository;
import com.mycompany.myapp.service.DetalleFacturaService;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DetalleFacturaResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class DetalleFacturaResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    private static final BigDecimal DEFAULT_PRECIO_UNITARIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO_UNITARIO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_SUBTOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_SUBTOTAL = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/detalle-facturas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;

    @Mock
    private DetalleFacturaRepository detalleFacturaRepositoryMock;

    @Mock
    private DetalleFacturaService detalleFacturaServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetalleFacturaMockMvc;

    private DetalleFactura detalleFactura;

    private DetalleFactura insertedDetalleFactura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleFactura createEntity() {
        return new DetalleFactura().cantidad(DEFAULT_CANTIDAD).precioUnitario(DEFAULT_PRECIO_UNITARIO).subtotal(DEFAULT_SUBTOTAL);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleFactura createUpdatedEntity() {
        return new DetalleFactura().cantidad(UPDATED_CANTIDAD).precioUnitario(UPDATED_PRECIO_UNITARIO).subtotal(UPDATED_SUBTOTAL);
    }

    @BeforeEach
    void initTest() {
        detalleFactura = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedDetalleFactura != null) {
            detalleFacturaRepository.delete(insertedDetalleFactura);
            insertedDetalleFactura = null;
        }
    }

    @Test
    @Transactional
    void createDetalleFactura() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DetalleFactura
        var returnedDetalleFactura = om.readValue(
            restDetalleFacturaMockMvc
                .perform(
                    post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DetalleFactura.class
        );

        // Validate the DetalleFactura in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertDetalleFacturaUpdatableFieldsEquals(returnedDetalleFactura, getPersistedDetalleFactura(returnedDetalleFactura));

        insertedDetalleFactura = returnedDetalleFactura;
    }

    @Test
    @Transactional
    void createDetalleFacturaWithExistingId() throws Exception {
        // Create the DetalleFactura with an existing ID
        detalleFactura.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        detalleFactura.setCantidad(null);

        // Create the DetalleFactura, which fails.

        restDetalleFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioUnitarioIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        detalleFactura.setPrecioUnitario(null);

        // Create the DetalleFactura, which fails.

        restDetalleFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSubtotalIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        detalleFactura.setSubtotal(null);

        // Create the DetalleFactura, which fails.

        restDetalleFacturaMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDetalleFacturas() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        // Get all the detalleFacturaList
        restDetalleFacturaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleFactura.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].precioUnitario").value(hasItem(sameNumber(DEFAULT_PRECIO_UNITARIO))))
            .andExpect(jsonPath("$.[*].subtotal").value(hasItem(sameNumber(DEFAULT_SUBTOTAL))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDetalleFacturasWithEagerRelationshipsIsEnabled() throws Exception {
        when(detalleFacturaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDetalleFacturaMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(detalleFacturaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDetalleFacturasWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(detalleFacturaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDetalleFacturaMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(detalleFacturaRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getDetalleFactura() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        // Get the detalleFactura
        restDetalleFacturaMockMvc
            .perform(get(ENTITY_API_URL_ID, detalleFactura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detalleFactura.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.precioUnitario").value(sameNumber(DEFAULT_PRECIO_UNITARIO)))
            .andExpect(jsonPath("$.subtotal").value(sameNumber(DEFAULT_SUBTOTAL)));
    }

    @Test
    @Transactional
    void getNonExistingDetalleFactura() throws Exception {
        // Get the detalleFactura
        restDetalleFacturaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDetalleFactura() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the detalleFactura
        DetalleFactura updatedDetalleFactura = detalleFacturaRepository.findById(detalleFactura.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDetalleFactura are not directly saved in db
        em.detach(updatedDetalleFactura);
        updatedDetalleFactura.cantidad(UPDATED_CANTIDAD).precioUnitario(UPDATED_PRECIO_UNITARIO).subtotal(UPDATED_SUBTOTAL);

        restDetalleFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetalleFactura.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedDetalleFactura))
            )
            .andExpect(status().isOk());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDetalleFacturaToMatchAllProperties(updatedDetalleFactura);
    }

    @Test
    @Transactional
    void putNonExistingDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detalleFactura.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(detalleFactura)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetalleFacturaWithPatch() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the detalleFactura using partial update
        DetalleFactura partialUpdatedDetalleFactura = new DetalleFactura();
        partialUpdatedDetalleFactura.setId(detalleFactura.getId());

        partialUpdatedDetalleFactura.subtotal(UPDATED_SUBTOTAL);

        restDetalleFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalleFactura.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDetalleFactura))
            )
            .andExpect(status().isOk());

        // Validate the DetalleFactura in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDetalleFacturaUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDetalleFactura, detalleFactura),
            getPersistedDetalleFactura(detalleFactura)
        );
    }

    @Test
    @Transactional
    void fullUpdateDetalleFacturaWithPatch() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the detalleFactura using partial update
        DetalleFactura partialUpdatedDetalleFactura = new DetalleFactura();
        partialUpdatedDetalleFactura.setId(detalleFactura.getId());

        partialUpdatedDetalleFactura.cantidad(UPDATED_CANTIDAD).precioUnitario(UPDATED_PRECIO_UNITARIO).subtotal(UPDATED_SUBTOTAL);

        restDetalleFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalleFactura.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDetalleFactura))
            )
            .andExpect(status().isOk());

        // Validate the DetalleFactura in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDetalleFacturaUpdatableFieldsEquals(partialUpdatedDetalleFactura, getPersistedDetalleFactura(partialUpdatedDetalleFactura));
    }

    @Test
    @Transactional
    void patchNonExistingDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detalleFactura.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetalleFactura() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        detalleFactura.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(detalleFactura))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalleFactura in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetalleFactura() throws Exception {
        // Initialize the database
        insertedDetalleFactura = detalleFacturaRepository.saveAndFlush(detalleFactura);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the detalleFactura
        restDetalleFacturaMockMvc
            .perform(delete(ENTITY_API_URL_ID, detalleFactura.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return detalleFacturaRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected DetalleFactura getPersistedDetalleFactura(DetalleFactura detalleFactura) {
        return detalleFacturaRepository.findById(detalleFactura.getId()).orElseThrow();
    }

    protected void assertPersistedDetalleFacturaToMatchAllProperties(DetalleFactura expectedDetalleFactura) {
        assertDetalleFacturaAllPropertiesEquals(expectedDetalleFactura, getPersistedDetalleFactura(expectedDetalleFactura));
    }

    protected void assertPersistedDetalleFacturaToMatchUpdatableProperties(DetalleFactura expectedDetalleFactura) {
        assertDetalleFacturaAllUpdatablePropertiesEquals(expectedDetalleFactura, getPersistedDetalleFactura(expectedDetalleFactura));
    }
}
