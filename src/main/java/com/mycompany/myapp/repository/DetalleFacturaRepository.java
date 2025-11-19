package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DetalleFactura;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DetalleFactura entity.
 */
@Repository
public interface DetalleFacturaRepository extends JpaRepository<DetalleFactura, Long> {
    default Optional<DetalleFactura> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<DetalleFactura> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<DetalleFactura> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select detalleFactura from DetalleFactura detalleFactura left join fetch detalleFactura.producto",
        countQuery = "select count(detalleFactura) from DetalleFactura detalleFactura"
    )
    Page<DetalleFactura> findAllWithToOneRelationships(Pageable pageable);

    @Query("select detalleFactura from DetalleFactura detalleFactura left join fetch detalleFactura.producto")
    List<DetalleFactura> findAllWithToOneRelationships();

    @Query("select detalleFactura from DetalleFactura detalleFactura left join fetch detalleFactura.producto where detalleFactura.id =:id")
    Optional<DetalleFactura> findOneWithToOneRelationships(@Param("id") Long id);
}
