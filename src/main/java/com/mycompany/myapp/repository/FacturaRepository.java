package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Factura;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Factura entity.
 */
@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    default Optional<Factura> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Factura> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Factura> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select factura from Factura factura left join fetch factura.cliente",
        countQuery = "select count(factura) from Factura factura"
    )
    Page<Factura> findAllWithToOneRelationships(Pageable pageable);

    @Query("select factura from Factura factura left join fetch factura.cliente")
    List<Factura> findAllWithToOneRelationships();

    @Query("select factura from Factura factura left join fetch factura.cliente where factura.id =:id")
    Optional<Factura> findOneWithToOneRelationships(@Param("id") Long id);
}
