package com.bitkal.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.model.dto.ModuelProfDTO;
import com.bitkal.backend.model.dto.SeanceProfesseurDTO;
import com.bitkal.backend.repository.SeanceRepo;

@Service
public class SeanceService {
    @Autowired
    private SeanceRepo seanceRepo;

    public List<SeanceProfesseurDTO> findSeanceProfesseur(String day, Long id) {
        Jours jour = Jours.valueOf(day.toUpperCase());
        List<Object[]> rawResults = seanceRepo.findSeanceProfesseurRaw(jour, id);
        return rawResults.stream()
                .map(result -> new SeanceProfesseurDTO(
                        (String) result[0], // p.nom
                        (String) result[1], // p.prenom
                        (String) result[2], // m.titre
                        result[3].toString(), // e.salle
                        result[4].toString(), // m.filiere
                        result[5].toString(),
                        result[6].toString()
                ))
                .collect(Collectors.toList());
    }

    public List<ModuelProfDTO> findAllModuelProfesseurByID(Long id) {
        List<Object[]> rawResults = seanceRepo.findAllModuelProfesseurByID(id);
        return rawResults.stream()
                .map(result -> new ModuelProfDTO(
                    result[0] != null ? (String) result[0] : "", // p.nom
                    result[0] != null ? (String) result[1] : "", // p.prenom
                    result[0] != null ? (String) result[2] : "", // m.titre
                    result[0] != null ? result[3].toString() : "", // e.salle
                    result[0] != null ? result[4].toString() : "", // m.filiere
                    result[0] != null ? result[5].toString() : "",
                    result[0] != null ? result[6].toString() : "",
                    result[0] != null ? result[7].toString() : "",
                    result[0] != null ? result[8].toString() : ""
                )) // Make sure this parenthesis is properly closed
                .collect(Collectors.toList());
    }
}