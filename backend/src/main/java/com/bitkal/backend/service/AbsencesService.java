package com.bitkal.backend.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.time.DayOfWeek;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.model.dto.AbsenceSeanceProfesseurDTO;
import com.bitkal.backend.model.dto.AllAbsenceEtudDTO;
import com.bitkal.backend.repository.AbsencesRepo;

@Service
public class AbsencesService {

    @Autowired
    private AbsencesRepo absencesRepo;

    private static final Logger logger = LoggerFactory.getLogger(AbsencesService.class);

    @Autowired
    // private GroupRepo groupRepo;

    // @Transactional
    // public String ajouterAbsence(Long idEtudiant, Salle salle, Long idEmploi) {
    //     return absencesRepo.ESPInsertAbsance(idEtudiant, salle, idEmploi);
    // }

    public List<Map<String, Object>> getWeeklyAbsences() {
        LocalDate today = LocalDate.now();

        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        Date sqlStartOfWeek = Date.valueOf(startOfWeek);
        Date sqlEndOfWeek = Date.valueOf(endOfWeek);

        List<Object[]> results = absencesRepo.countAbsencesPerDay(sqlStartOfWeek, sqlEndOfWeek);

        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> dayAbsence = new HashMap<>();
            
            int dayNumber = ((Number) row[0]).intValue(); // Récupérer le jour sous forme de nombre
            LocalDate date = LocalDate.of(today.getYear(), today.getMonth(), dayNumber);
            String dayName = date.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.FRENCH).toUpperCase();

            dayAbsence.put("day", dayName);  // Converti en nom de jour (LUNDI, MARDI...)
            dayAbsence.put("count", row[1]); // Nombre d'absences
            response.add(dayAbsence);
        }
        return response;
    }

    public Map<String, Integer> getYearAbsences() {
        // Obtenir l'année actuelle
        int currentYear = Year.now().getValue();
        
        // Créer une map pour stocker les absences par mois
        Map<String, Integer> absencesParMois = new HashMap<>();
        
        // Boucle sur chaque mois de l'année actuelle (1 à 12)
        for (int month = 1; month <= 12; month++) {
            // Obtenir le premier et le dernier jour du mois actuel
            LocalDate startOfMonth = LocalDate.of(currentYear, month, 1);
            LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());
            
            // Conversion des LocalDate en java.sql.Date
            Date startDate = new java.sql.Date(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli());
            Date endDate = new java.sql.Date(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli());
    
            // Appeler la méthode du repository pour obtenir le nombre d'absences du mois
            List<Object[]> result = absencesRepo.countAbsencesPerMonth(startDate, endDate);
            
            // Supposons que le résultat contient une seule valeur, celle du nombre d'absences
            // Ajouter le nombre d'absences dans la map
            if (!result.isEmpty()) {
                Object[] countResult = result.get(0);
                absencesParMois.put(Month.of(month).getDisplayName(TextStyle.FULL, Locale.FRANCE).toUpperCase(), ((Long) countResult[0]).intValue());
            } else {
                absencesParMois.put(Month.of(month).getDisplayName(TextStyle.FULL, Locale.FRANCE).toUpperCase(), 0);
            }
        }
    
        return absencesParMois;
    }

    public List<AbsenceSeanceProfesseurDTO> findAllAbsencesEtudiantInSeanceProf(Long idProf) {
        // List<Long> idsGroups = groupRepo.findGroupsIdsByProfessorId(idProf);
        List<Object[]> absences = absencesRepo.findAllAbsencesEtudiantInSeanceProf(idProf);

        List<AbsenceSeanceProfesseurDTO> absenceSeanceProfesseur = new ArrayList<>();

        for (Object[] absence : absences) {
            absenceSeanceProfesseur.add(new AbsenceSeanceProfesseurDTO(
                (Long) absence[0],          // a.id -> idAbsences
                (Date) absence[1],          // a.dateAbsences -> dateAbsences
                (Boolean) absence[2],       // a.isJustif -> isJustifAbsences
                (Long) absence[3],          // j.id -> idJustification
                (String) absence[5],        // j.description -> descriptionJustification
                (byte[]) absence[4],        // j.document -> documentJustification
                (String) absence[6],        // e.nom -> nomEtud
                (String) absence[7],        // e.prenom -> prenomEtud
                (String) absence[8],        // g.name -> nomModule
                (String) absence[9]         // m.titre -> titreModule
            ));
        }

        return absenceSeanceProfesseur;
    }

    public List<Object[]> findAllAbsencesEtudiantInSeanceProfY(){
        return absencesRepo.findAllAbsencesEtudiantInSeanceProfY();
    }
    
    public Map<String, Integer> statisticParent(Long idEtud) {
        if (idEtud == null) {
            logger.error("idEtud must not be null");
            throw new IllegalArgumentException("idEtud must not be null");
        }
        logger.debug("Fetching absence statistics for idEtud: {}", idEtud);
        int totalAbsence = absencesRepo.findCountAbsencesEtud(idEtud);
        int absenceJustif = absencesRepo.findCountAbsencesJustifEtud(idEtud);
        int absenceNoJustif = absencesRepo.findCountAbsencesNoJustifEtud(idEtud);
        Map<String, Integer> statistic = new HashMap<>();
        statistic.put("totalAbsence", totalAbsence);
        statistic.put("absenceJustif", absenceJustif);
        statistic.put("absenceNoJustif", absenceNoJustif);
        logger.debug("Found {} total absences, {} justified, {} unjustified for idEtud: {}", 
                     totalAbsence, absenceJustif, absenceNoJustif, idEtud);
        return statistic;
    }

    public List<AllAbsenceEtudDTO> findAllAbsencesEtud(Long idEtud) {
        List<Object[]> objects = absencesRepo.findAllAbsencesEtud(idEtud);
        System.out.println("Query result size: " + (objects != null ? objects.size() : 0));
        List<AllAbsenceEtudDTO> allAbsenceEtud = new ArrayList<>();
        if (objects != null) {
            for (Object[] object : objects) {
                allAbsenceEtud.add(new AllAbsenceEtudDTO(
                    object[0] != null ? object[0].toString() : null,
                    object[1] != null ? object[1].toString() : null,
                    object[2] != null ? object[2].toString() : null,
                    object[3] != null ? object[3].toString() : null,
                    object[4] != null ? object[4].toString() : null,
                    object[5] != null ? object[5].toString() : null,
                    object[6] != null ? object[6].toString() : null
                ));
            }
        }
        return allAbsenceEtud;
    }
}
