package com.bitkal.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bitkal.backend.model.dto.ModuelProfDTO;
import com.bitkal.backend.model.dto.SeanceEnfantDTO;
import com.bitkal.backend.model.dto.SeanceProfesseurDTO;
import com.bitkal.backend.service.SeanceService;

@RestController
@RequestMapping("/api")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;

    @GetMapping("/seances/professeur")
    public List<SeanceProfesseurDTO> findSeanceProfesseur(
            @RequestParam("jour") String jour,
            @RequestParam("id") Long id) {
        return seanceService.findSeanceProfesseur(jour, id);
    }

    @GetMapping("/module/professeur")
    public List<ModuelProfDTO> findAllModuelProfesseurByID(@RequestParam("id") Long id) {
        return seanceService.findAllModuelProfesseurByID(id);
    }

    @GetMapping("/seances/count/professeur")
    public int findCountSeance(@RequestParam("id") Long id) {
        return seanceService.findCountSeance(id);
    }

    @GetMapping("/module/count/professeur")
    public int findCountModuelProfesseurByID(@RequestParam("id") Long id) {
        return seanceService.findCountModuelProfesseurByID(id);
    }
    
    @GetMapping("/count/groups")
    public Long getMethodName(@RequestParam Long professorId) {
        return seanceService.countDistinctGroupsByProfessorId(professorId);
    }
    
    @GetMapping("/module/professeur/semestre")
    public List<ModuelProfDTO> findAllModuelProfesseurByIdAndSemestre(@RequestParam("id") Long id, @RequestParam("semestre") String semestre) {
        return seanceService.findAllModuelProfesseurByIdAndSemestre(id, semestre);
    }

    @GetMapping("/seance/enfant")
    public ResponseEntity<List<SeanceEnfantDTO>> findAllSeanceEnfantDansJour(
            @RequestParam("idEnfant") Long idEnfant, @RequestParam("jour") String jour) {
        try {
            List<SeanceEnfantDTO> result = seanceService.findAllSeanceEnfantDansJour(idEnfant, jour);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/seance/enfant/all")
    public ResponseEntity<List<SeanceEnfantDTO>> findAllSeanceEnfant(
            @RequestParam("idEnfant") Long idEnfant) {
        try {
            List<SeanceEnfantDTO> result = seanceService.findAllSeanceEnfant(idEnfant);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}