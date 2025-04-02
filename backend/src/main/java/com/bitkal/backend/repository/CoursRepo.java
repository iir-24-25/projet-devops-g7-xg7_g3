package com.bitkal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Cours;

@Repository
public interface CoursRepo extends JpaRepository<Cours, Long>{
}