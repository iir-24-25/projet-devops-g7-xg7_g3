package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Justification;

@Repository
public interface JustificationRepo extends JpaRepository<Justification, Long> {
    @Query("SELECT j FROM Justification j " +
           "LEFT JOIN FETCH j.absence")
    Page<Justification> findAllWithRelations(Pageable pageable);
}