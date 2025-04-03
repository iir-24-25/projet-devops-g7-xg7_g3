package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Parents;

@Repository
public interface ParentsRepo extends JpaRepository<Parents, Long> {
    @Query("SELECT p FROM Parents p " +
           "LEFT JOIN FETCH p.etudiants")
    Page<Parents> findAllWithRelations(Pageable pageable);
}