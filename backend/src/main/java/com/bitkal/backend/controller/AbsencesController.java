package com.bitkal.backend.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import com.bitkal.backend.model.dto.AbsenceSeanceProfesseurDTO;
import com.bitkal.backend.service.AbsencesService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class AbsencesController {

    @Autowired
    private AbsencesService absencesService;

    private static final Logger logger = LoggerFactory.getLogger(AbsencesController.class);

    // @PostMapping("/ajouterAbsence")
    // public ResponseEntity<?> ajouterAbsence(@RequestBody List<ESPAbsencesDTO> espAbsencesDTO) {
    //     if (espAbsencesDTO == null || espAbsencesDTO.isEmpty()) {
    //         return ResponseEntity.badRequest().body("La liste des absences est vide.");
    //     }

    //     List<String> results = espAbsencesDTO.stream().map(ead -> {
    //         try {
    //             Salle salle = Salle.valueOf(ead.getSalle().toUpperCase());
    //             return absencesService.ajouterAbsence(ead.getIdEtudiant(), salle, ead.getIdEmploi());
    //         } catch (IllegalArgumentException ex) {
    //             return "Erreur : Salle invalide pour l'étudiant " + ead.getIdEtudiant();
    //         }
    //     }).collect(Collectors.toList());

    //     return ResponseEntity.ok(results);
    // }

    @GetMapping("/weekly")
    public List<Map<String, Object>> getWeeklyAbsences() {
        return absencesService.getWeeklyAbsences();
    }

    @GetMapping("/Absences/month")
    public Map<String, Integer> getYearAbsences() {
        return absencesService.getYearAbsences();
    }

    @GetMapping("/Absences/EtudiantInSeanceProf")
    public List<AbsenceSeanceProfesseurDTO> findAllAbsencesEtudiantInSeanceProf(@RequestParam Long idProf) {
        return absencesService.findAllAbsencesEtudiantInSeanceProf(idProf);
    }

    @GetMapping("/Absences/EtudiantInSeanceProfY")
    public List<Object[]> findAllAbsencesEtudiantInSeanceProfY() {
        return absencesService.findAllAbsencesEtudiantInSeanceProfY();
    }

    @GetMapping("/Absences/statisticParent")
    @PreAuthorize("hasRole('PAR')")
    public ResponseEntity<Map<String, Integer>> statisticParent(@RequestParam("idEnfant") Long idEtud) {
        try {
            logger.debug("Request to fetch absence statistics for idEnfant: {}", idEtud);
            Map<String, Integer> result = absencesService.statisticParent(idEtud);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid request for idEnfant: {}", idEtud, e);
            return ResponseEntity.badRequest().body(null);
        }
    }
    
}
