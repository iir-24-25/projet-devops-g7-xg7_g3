package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Etablissement;

@Repository
public interface EtablissementRepo extends JpaRepository<Etablissement, Long> {
    @Query("SELECT e FROM Etablissement e " +
           "LEFT JOIN FETCH e.groups")
    Page<Etablissement> findAllWithRelations(Pageable pageable);
}