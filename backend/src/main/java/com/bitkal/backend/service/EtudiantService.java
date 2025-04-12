package com.bitkal.backend.service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.model.dto.EnfantDTO;
import com.bitkal.backend.model.entity.Etudiant;
import com.bitkal.backend.repository.EtudiantRepo;
import com.bitkal.backend.repository.GroupRepo;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepo etudiantRepo;

    @Autowired
    private GroupRepo groupRepo;

    // public List<ESPStudentDTO> findEtudiantsForTimetable(Jours jour, Salle salle, Seances seance, Semestre semestre) {
    //     List<Etudiant> etudiants = etudiantRepo.findEtudiantsForTimetable(jour, salle, seance, semestre);
    //     return etudiants.stream()
    //             .map(e -> new ESPStudentDTO(e.getId(), e.getAddressMAC()))
    //             .collect(Collectors.toList());
    // }

    public Map<String, Integer> numberTotalEtudiantsPresents() {
        Map<String, Integer> totalEtudiants = new HashMap<>();
        for (Jours jour : Jours.values()) {
            try {
                int resultat = etudiantRepo.numberTotalEtudiantsPresents(jour);
                totalEtudiants.put(jour.name(), resultat);
            } catch (Exception e) {
                System.err.println("Erreur lors du calcul pour le jour " + jour + " : " + e.getMessage());
                totalEtudiants.put(jour.name(), 0);
            }
        }
        return totalEtudiants;
    }

    public Map<String, Integer> numberTotalEtudiantsPresentsByMois() {
        Map<String, Integer> totalEtudiantsParJour = numberTotalEtudiantsPresents();
        Map<String, Integer> totalEtudiantsParMois = new HashMap<>();

        // Obtenir l'année actuelle
        int currentYear = Year.now().getValue();

        // Boucler sur chaque mois de l'année actuelle
        for (int month = 1; month <= 12; month++) {
            // Créer un nom de mois (ex: JANVIER, FÉVRIER, ...)
            String monthName = Month.of(month).getDisplayName(TextStyle.FULL, Locale.FRANCE).toUpperCase();
            
            // Initialiser un compteur pour le nombre total d'étudiants présents ce mois-ci
            int totalPresentsInMonth = 0;
            
            // Boucler sur chaque jour du mois
            for (int day = 1; day <= Month.of(month).length(Year.isLeap(currentYear)); day++) {
                // Obtenir le jour de la semaine pour la date (ex: LUNDI, MARDI, ...)
                LocalDate date = LocalDate.of(currentYear, month, day);
                String dayOfWeek = date.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.FRANCE).toUpperCase();
                
                // Ajouter les étudiants présents ce jour à la somme du mois
                if (totalEtudiantsParJour.containsKey(dayOfWeek)) {
                    totalPresentsInMonth += totalEtudiantsParJour.get(dayOfWeek);
                }
            }

            // Ajouter au résultat final pour ce mois
            totalEtudiantsParMois.put(monthName, totalPresentsInMonth);
        }

        return totalEtudiantsParMois;
    }

    public Map<String, Long> numberGroupAndEtudProfByIdProf(Long idProf) {
        // Validate input parameter
        if (idProf == null) {
            throw new IllegalArgumentException("Professor ID cannot be null");
        }
    
        // Initialize result map with default values
        Map<String, Long> result = new HashMap<>();
        result.put("etudiant", 0L);
        result.put("groups", 0L);
    
        try {
            // Get group IDs for professor
            List<Long> idsGroup = groupRepo.findGroupsIdsByProfessorId(idProf);
            
            // If no groups found, return default values
            if (idsGroup == null || idsGroup.isEmpty()) {
                return result;
            }
    
            // Count students in these groups
            Long numberEtud = etudiantRepo.findCountEtudProfByIdsGroup(idsGroup);
            
            // Populate result map
            result.put("groups", (long) idsGroup.size());
            result.put("etudiant", numberEtud != null ? numberEtud : 0L);
            
        } catch (Exception e) {
            return result;
        }
    
        return result;
    }

    public List<EnfantDTO> findAllEnfantByIdParent(Long idParent) {
        List<Etudiant> etudiants = etudiantRepo.findAllEnfantByIdParent(idParent);
        return etudiants.stream()
                .map(this::convertToEnfantDTO)
                .collect(Collectors.toList());
    }

    private EnfantDTO convertToEnfantDTO(Etudiant etudiant) {
        EnfantDTO dto = new EnfantDTO();
        dto.setNom(etudiant.getNom());
        dto.setPrenom(etudiant.getPrenom());
        dto.setEmail(etudiant.getEmail());
        dto.setTel(etudiant.getTel());
        dto.setGender(etudiant.getGender());
        dto.setNiveau(etudiant.getNiveau());
        dto.setAddressMAC(etudiant.getAddressMAC());
        dto.setFiliere(etudiant.getFiliere());
        dto.setImage(etudiant.getImage());
        return dto;
    }

}