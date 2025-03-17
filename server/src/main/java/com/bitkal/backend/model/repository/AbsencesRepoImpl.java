package com.bitkal.backend.model.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.constant.Salle;

import java.util.logging.Logger;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class AbsencesRepoImpl implements AbsencesRepoCustom {
    private static final Logger LOGGER = Logger.getLogger(AbsencesRepoImpl.class.getName());

    @Autowired
    private EntityManager entityManager;

    @Override
    @Modifying
    @Transactional
    public String ESPInsertAbsance(long idEtudiant, Salle salle, Long idEmploi) {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String sql = "INSERT INTO absences (date_absence, salle, emploi_temps_id, etudiant_id) VALUES (:date, :salle, :idEmploi, :idEtudiant)";
        
        try {
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("idEtudiant", idEtudiant);
            query.setParameter("salle", salle);
            query.setParameter("idEmploi", idEmploi);
            query.setParameter("date", currentDate);
            
            int result = query.executeUpdate();
            
            if (result > 0) {
                LOGGER.info("Absence insérée avec succès pour l'étudiant ID: " + idEtudiant);
                return "L'absence a été enregistrée avec succès.";
            } else {
                LOGGER.warning("Échec de l'insertion de l'absence pour l'étudiant ID: " + idEtudiant);
                return "L'absence n'a pas pu être enregistrée.";
            }
        } catch (Exception e) {
            LOGGER.severe("Erreur lors de l'insertion de l'absence : " + e.getMessage());
            throw new RuntimeException("Erreur lors de l'insertion de l'absence", e); // Capture et relance une exception
        }
}


}
