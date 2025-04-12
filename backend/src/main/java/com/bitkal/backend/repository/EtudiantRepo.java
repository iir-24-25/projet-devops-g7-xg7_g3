package com.bitkal.backend.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitkal.backend.constant.Jours;
// import com.bitkal.backend.constant.Salle;
// import com.bitkal.backend.constant.Seances;
// import com.bitkal.backend.constant.Semestre;
import com.bitkal.backend.model.entity.Etudiant;

public interface EtudiantRepo extends JpaRepository<Etudiant, Long> {
    
    @Query("SELECT COUNT(e) FROM Etudiant e " +
        "JOIN e.group g " +
        "JOIN g.emploisTemp et " +
        "WHERE et.jour = :jours")
    int numberTotalEtudiantsPresents(@Param("jours") Jours jours);

    @Query("SELECT e FROM Etudiant e " +
           "LEFT JOIN FETCH e.group " +
           "LEFT JOIN FETCH e.absences " +
           "LEFT JOIN FETCH e.parents")
    Page<Etudiant> findAllWithRelations(Pageable pageable);

    @Query("SELECT COUNT(e) FROM Etudiant e "+
        "INNER JOIN e.group g "+
        "WHERE g.id IN :idsGroup")
    Long findCountEtudProfByIdsGroup(@Param("idsGroup") List<Long> idsGroup);

    @Query("SELECT e FROM Etudiant e WHERE e.parents.id = :idParent")
    List<Etudiant> findAllEnfantByIdParent(@Param("idParent") Long idParent);

}