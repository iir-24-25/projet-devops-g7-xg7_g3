package com.bitkal.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Professeur;

@Repository
public interface ProfesseurRepo extends JpaRepository<Professeur, Long>{
}
