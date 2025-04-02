package com.bitkal.backend.service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.Locale;
// import java.util.List;
import java.util.Map;
// import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.repository.EtudiantRepo;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepo etudiantRepo;

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
}