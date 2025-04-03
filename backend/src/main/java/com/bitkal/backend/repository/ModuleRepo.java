package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Module;

@Repository
public interface ModuleRepo extends JpaRepository<Module, Long> {
    @Query("SELECT m FROM Module m " +
           "LEFT JOIN FETCH m.cours " +
           "LEFT JOIN FETCH m.seances " +
           "LEFT JOIN FETCH m.groups")
    Page<Module> findAllWithRelations(Pageable pageable);
}