package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.EmploiTemps;

@Repository
public interface EmploiTempsRepo extends JpaRepository<EmploiTemps, Long> {
    @Query("SELECT et FROM EmploiTemps et " +
           "LEFT JOIN FETCH et.groupe " +
           "LEFT JOIN FETCH et.seances")
    Page<EmploiTemps> findAllWithRelations(Pageable pageable);
}