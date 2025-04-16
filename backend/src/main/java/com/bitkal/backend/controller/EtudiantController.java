package com.bitkal.backend.controller;

import java.util.List;
// import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.model.dto.AllProfEtudiant;
import com.bitkal.backend.model.dto.EnfantDTO;
// import com.bitkal.backend.constant.Jours;
// import com.bitkal.backend.constant.Salle;
// import com.bitkal.backend.constant.Seances;
// import com.bitkal.backend.constant.Semestre;
// import com.bitkal.backend.model.dto.ESPStudentDTO;
import com.bitkal.backend.service.EtudiantService;

@RestController
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;

    // @GetMapping("/ESP/listEtudiant")
    // public List<ESPStudentDTO> findEtudiantsForTimetable(
    //         @RequestParam String jour, 
    //         @RequestParam String salle, 
    //         @RequestParam String seance, 
    //         @RequestParam String semestre) {
        
    //     // Conversion explicite des chaînes en valeurs enum
    //     Jours jourEnum = Jours.valueOf(jour.toUpperCase());
    //     Salle salleEnum = Salle.valueOf(salle.toUpperCase());
    //     Seances seanceEnum = Seances.valueOf(seance.toUpperCase());
    //     Semestre semestreEnum = Semestre.valueOf(semestre.toUpperCase());

    //     return etudiantService.findEtudiantsForTimetable(jourEnum, salleEnum, seanceEnum, semestreEnum);
    // }

    @GetMapping("/presence-par-jour")
    public Map<String, Integer> getPresenceParJour() {
        return etudiantService.numberTotalEtudiantsPresents();
    }

    @GetMapping("/presence-par-mois")
    public Map<String, Integer> getPresenceParMois() {
        return etudiantService.numberTotalEtudiantsPresentsByMois();
    }

    @GetMapping("/GroupAndEtud/Prof")
    public Map<String, Long> numberGroupAndEtudProfByIdProf(Long idProf){
        return etudiantService.numberGroupAndEtudProfByIdProf(idProf);
    }
    
    @GetMapping("/Etudiant/allEnfant")
    public List<EnfantDTO> findAllEnfantByIdParent(@RequestParam("idParent") Long idParent) {
        return etudiantService.findAllEnfantByIdParent(idParent);
    }

    @GetMapping("/Etudiant/allProf")
    public ResponseEntity<List<AllProfEtudiant>> findAllProfesseurEtudiant(@RequestParam("idEtud") Long idEtud) {
        if (idEtud == null || idEtud <= 0) {
            return ResponseEntity.badRequest().build();
        }
        List<AllProfEtudiant> professors = etudiantService.findAllProfesseurEtudiant(idEtud);
        return professors.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(professors);
    }

    @GetMapping("/Etudiant/NumberProf")
    public int findNumberAllProfesseurEtudiant(@RequestParam("idEtud") Long idEtud) {
        return etudiantService.findNumberAllProfesseurEtudiant(idEtud);
    }
    
    
}
