package com.bitkal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.EmploiTemps;

@Repository
public interface EmploiTempsRepo extends JpaRepository<EmploiTemps, Long>{
}