package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Professeur;

@Repository
public interface ProfesseurRepo extends JpaRepository<Professeur, Long> {
    @Query("SELECT p FROM Professeur p " +
           "LEFT JOIN FETCH p.cours")
    Page<Professeur> findAllWithRelations(Pageable pageable);
}