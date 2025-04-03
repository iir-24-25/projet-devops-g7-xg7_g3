package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Long> {
    // No need for findAllWithRelations, use default findAll
    Page<Admin> findAll(Pageable pageable);
}