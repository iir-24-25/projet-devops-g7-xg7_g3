package com.bitkal.backend.model.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.constant.Seances;
import com.bitkal.backend.constant.Semestre;
import com.bitkal.backend.model.entity.Etudiant;

public interface EtudiantRepo extends JpaRepository<Etudiant, Long> {

    @Query("SELECT e FROM Etudiant e JOIN e.group g JOIN Cours c ON g.id = c.__group.id " +
           "JOIN EmploiTemps et ON c.__emploiTemps.id = et.id " +
           "WHERE et.__eJour = :jour AND et.__eSalle = :salle " +
           "AND et.__eSeance = :seance AND et.__eSemestre = :semestre")
    List<Etudiant> findEtudiantsForTimetable(
        @Param("jour") Jours jour,
        @Param("salle") Salle salle,
        @Param("seance") Seances seance,
        @Param("semestre") Semestre semestre
    );

    

}