package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Seance;

@Repository
public interface SeanceRepo extends JpaRepository<Seance, Long> {
    @Query("SELECT s FROM Seance s " +
           "LEFT JOIN FETCH s.absences " +
           "LEFT JOIN FETCH s.module " +
           "LEFT JOIN FETCH s.emploiTemp")
    Page<Seance> findAllWithRelations(Pageable pageable);
}