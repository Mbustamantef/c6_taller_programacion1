package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Cliente;
import com.mycompany.myapp.repository.ClienteRepository;
import com.mycompany.myapp.service.ClienteService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Cliente}.
 */
@Service
@Transactional
public class ClienteServiceImpl implements ClienteService {

    private static final Logger LOG = LoggerFactory.getLogger(ClienteServiceImpl.class);

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public Cliente save(Cliente cliente) {
        LOG.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    @Override
    public Cliente update(Cliente cliente) {
        LOG.debug("Request to update Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> partialUpdate(Cliente cliente) {
        LOG.debug("Request to partially update Cliente : {}", cliente);

        return clienteRepository
            .findById(cliente.getId())
            .map(existingCliente -> {
                if (cliente.getNombre() != null) {
                    existingCliente.setNombre(cliente.getNombre());
                }
                if (cliente.getRucCi() != null) {
                    existingCliente.setRucCi(cliente.getRucCi());
                }
                if (cliente.getTelefono() != null) {
                    existingCliente.setTelefono(cliente.getTelefono());
                }
                if (cliente.getEmail() != null) {
                    existingCliente.setEmail(cliente.getEmail());
                }
                if (cliente.getDireccion() != null) {
                    existingCliente.setDireccion(cliente.getDireccion());
                }
                if (cliente.getFechaAlta() != null) {
                    existingCliente.setFechaAlta(cliente.getFechaAlta());
                }

                return existingCliente;
            })
            .map(clienteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Cliente> findAll(Pageable pageable) {
        LOG.debug("Request to get all Clientes");
        return clienteRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findOne(Long id) {
        LOG.debug("Request to get Cliente : {}", id);
        return clienteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Cliente : {}", id);
        clienteRepository.deleteById(id);
    }
}
