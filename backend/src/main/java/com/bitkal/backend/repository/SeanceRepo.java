package com.bitkal.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.model.entity.Seance;

@Repository
public interface SeanceRepo extends JpaRepository<Seance, Long> {
    @Query("SELECT s FROM Seance s " +
           "LEFT JOIN FETCH s.absences " +
           "LEFT JOIN FETCH s.module " +
           "LEFT JOIN FETCH s.emploiTemp")
    Page<Seance> findAllWithRelations(Pageable pageable);

    @Query("SELECT DISTINCT p.nom, p.prenom, m.titre, e.salle, m.filiere, m.niveau, e.seance " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN s.emploiTemp e " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "WHERE e.jour = :jour AND p.id = :id")
    List<Object[]> findSeanceProfesseurRaw(@Param("jour") Jours jour, @Param("id") Long id);

    @Query("SELECT DISTINCT p.nom, p.prenom, m.titre, e.salle, m.filiere, m.niveau, e.seance, e.jour, e.semestre " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN s.emploiTemp e " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "WHERE p.id = :id")
    List<Object[]> findAllModuelProfesseurByID(@Param("id") Long id);
}