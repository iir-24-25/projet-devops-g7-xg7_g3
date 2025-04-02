package com.bitkal.backend.repository;

// import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitkal.backend.constant.Jours;
// import com.bitkal.backend.constant.Salle;
// import com.bitkal.backend.constant.Seances;
// import com.bitkal.backend.constant.Semestre;
import com.bitkal.backend.model.entity.Etudiant;

public interface EtudiantRepo extends JpaRepository<Etudiant, Long> {
    
    @Query("SELECT COUNT(e) FROM Etudiant e " +
        "JOIN e.group g " +
        "JOIN g.emploisTemp et " +
        "WHERE et.jour = :jours")
    int numberTotalEtudiantsPresents(@Param("jours") Jours jours);


}