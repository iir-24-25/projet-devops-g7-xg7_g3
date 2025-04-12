package com.bitkal.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitkal.backend.model.entity.Absences;


public interface AbsencesRepo extends JpaRepository<Absences, Long> , AbsencesRepoCustom {
       @Query("SELECT FUNCTION('DAY', a.dateAbsences) AS jour, COUNT(a) " +
           "FROM Absences a " +
           "WHERE a.dateAbsences BETWEEN :startOfWeek AND :endOfWeek " +
           "GROUP BY FUNCTION('DAY', a.dateAbsences) " +
           "ORDER BY jour")
       List<Object[]> countAbsencesPerDay(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);

       @Query("SELECT COUNT(a) FROM Absences a WHERE a.dateAbsences BETWEEN :startOfMonth AND :endOfMonth" )
       List<Object[]> countAbsencesPerMonth(@Param("startOfMonth") Date startMonth, @Param("endOfMonth") Date endOfMonth);

       @Query("SELECT a FROM Absences a JOIN FETCH a.etudiant e WHERE TYPE(e) = Etudiant")
       List<Absences> findAllValidAbsences();

       @Query("SELECT a FROM Absences a " +
           "LEFT JOIN FETCH a.etudiant " +
           "LEFT JOIN FETCH a.seance " +
           "LEFT JOIN FETCH a.notification " +
           "LEFT JOIN FETCH a.justification")
       Page<Absences> findAllWithRelations(Pageable pageable);

       @Query("SELECT a.id, a.dateAbsences, a.isJustif, j.id, j.document, j.description, e.nom, e.prenom, g.name, a.module.titre " +
              "FROM Absences a " +
              "INNER JOIN a.justification j " +
              "INNER JOIN a.etudiant e " +
              "INNER JOIN a.module m " +
              "INNER JOIN m.cours c " +
              "INNER JOIN c.professeur p " +
              "INNER JOIN m.groups g " +
              "WHERE p.id = :idProf")
       List<Object[]> findAllAbsencesEtudiantInSeanceProf(@Param("idProf") Long idProf);

       @Query("SELECT a " +
              "FROM Absences a " +
              "INNER JOIN a.module m "+
              "INNER JOIN m.cours c "+
              "INNER JOIN c.professeur p "+
              "WHERE p.id = 61999")
       List<Object[]> findAllAbsencesEtudiantInSeanceProfY();

       @Query("SELECT COUNT(a) FROM Absences a " +
           "INNER JOIN a.etudiant e " +
           "WHERE e.id = :idEtud")
       int findCountAbsencesEtud(@Param("idEtud") Long idEtud);

    @Query("SELECT COUNT(a) FROM Absences a " +
           "INNER JOIN a.etudiant e " +
           "WHERE e.id = :idEtud AND a.isJustif = true")
    int findCountAbsencesJustifEtud(@Param("idEtud") Long idEtud);

    @Query("SELECT COUNT(a) FROM Absences a " +
           "INNER JOIN a.etudiant e " +
           "WHERE e.id = :idEtud AND a.isJustif = false")
    int findCountAbsencesNoJustifEtud(@Param("idEtud") Long idEtud);

}
