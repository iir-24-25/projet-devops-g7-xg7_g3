package com.bitkal.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.model.dto.ESPAbsencesDTO;
import com.bitkal.backend.service.AbsencesService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class AbsencesController {

    @Autowired
    private AbsencesService absencesService;

    @PostMapping("/ajouterAbsence")
    public ResponseEntity<?> ajouterAbsence(@RequestBody List<ESPAbsencesDTO> espAbsencesDTO) {
        if (espAbsencesDTO == null || espAbsencesDTO.isEmpty()) {
            return ResponseEntity.badRequest().body("La liste des absences est vide.");
        }

        List<String> results = espAbsencesDTO.stream().map(ead -> {
            try {
                Salle salle = Salle.valueOf(ead.getSalle().toUpperCase());
                return absencesService.ajouterAbsence(ead.getIdEtudiant(), salle, ead.getIdEmploi());
            } catch (IllegalArgumentException ex) {
                return "Erreur : Salle invalide pour l'étudiant " + ead.getIdEtudiant();
            }
        }).collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }

    @GetMapping("/weekly")
    public List<Map<String, Object>> getWeeklyAbsences() {
        return absencesService.getWeeklyAbsences();
    }

    @GetMapping("/Absences/month")
    public Map<String, Integer> getYearAbsences() {
        return absencesService.getYearAbsences();
    }
    
}
