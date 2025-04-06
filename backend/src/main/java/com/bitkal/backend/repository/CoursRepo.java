package com.bitkal.backend.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Cours;

@Repository
public interface CoursRepo extends JpaRepository<Cours, Long> {
    @Query("SELECT c FROM Cours c " +
           "LEFT JOIN FETCH c.module " +
           "LEFT JOIN FETCH c.professeur")
    Page<Cours> findAllWithRelations(Pageable pageable);

}