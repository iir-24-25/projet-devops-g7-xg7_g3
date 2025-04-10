package com.bitkal.backend.repository;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.constant.Semestre;
import com.bitkal.backend.model.entity.Seance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    @Query("SELECT COUNT(s) " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "WHERE p.id = :id")
    int findCountSeance(@Param("id") Long id);

    @Query("SELECT DISTINCT m.titre " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN s.emploiTemp e " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "WHERE p.id = :id")
    List<String> findCountModuleProfesseurByID(@Param("id") Long id);

    @Query("SELECT DISTINCT g.name " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN s.emploiTemp e " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "INNER JOIN e.groupe g " +
           "WHERE p.id = :id")
    List<String> findGroupNamesByProfessorId(@Param("id") Long id);

    @Query("SELECT DISTINCT p.nom, p.prenom, m.titre, e.salle, m.filiere, m.niveau, e.seance, e.jour, e.semestre " +
           "FROM Seance s " +
           "INNER JOIN s.module m " +
           "INNER JOIN s.emploiTemp e " +
           "INNER JOIN m.cours c " +
           "INNER JOIN c.professeur p " +
           "WHERE p.id = :id AND e.semestre = :semestre")
    List<Object[]> findAllModuelProfesseurByIdAndSemestre(@Param("id") Long id, @Param("semestre") Semestre semestre);
    
}