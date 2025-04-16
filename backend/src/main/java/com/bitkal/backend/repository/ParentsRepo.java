package com.bitkal.backend.repository;

import com.bitkal.backend.model.entity.Parents;

import jakarta.persistence.Tuple;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentsRepo extends JpaRepository<Parents, Long> {

    @Query("SELECT p FROM Parents p LEFT JOIN FETCH p.etudiants")
    Page<Parents> findAllWithRelations(Pageable pageable);

    @Query("SELECT p.nom, p.prenom, p.email, p.tel, p.image, p.ville " +
       "FROM Parents p WHERE p.id = :idParent")
    Tuple findInfoParent(@Param("idParent") Long idParent);
}