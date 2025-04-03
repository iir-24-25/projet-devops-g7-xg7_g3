package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Vacances;

@Repository
public interface VacancesRepo extends JpaRepository<Vacances, Long> {
    // No need for findAllWithRelations, use default findAll
    Page<Vacances> findAll(Pageable pageable);
}