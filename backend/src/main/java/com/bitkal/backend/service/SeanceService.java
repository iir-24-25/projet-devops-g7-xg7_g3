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
                    result[1] != null ? (String) result[1] : "", // p.prenom
                    result[2] != null ? (String) result[2] : "", // m.titre
                    result[3] != null ? result[3].toString() : "", // e.salle
                    result[4] != null ? result[4].toString() : "", // m.filiere
                    result[5] != null ? result[5].toString() : "", // m.niveau
                    result[6] != null ? result[6].toString() : "", // e.seance
                    result[7] != null ? result[7].toString() : "", // e.jour
                    result[8] != null ? result[8].toString() : ""  // e.semestre
                ))
                .collect(Collectors.toList());
    }

    public int findCountSeance(Long id){
        return seanceRepo.findCountSeance(id);
    }

    public int findCountModuelProfesseurByID(Long id){
        List<String> modeuls = seanceRepo.findCountModuleProfesseurByID(id);
        return modeuls.size();
    }

    public long countDistinctGroupsByProfessorId(Long professorId) {
        List<String> groupNames = seanceRepo.findGroupNamesByProfessorId(professorId);
        for(String group : groupNames){
            System.out.println(group);
        }
        return groupNames.size(); // Conversion implicite de int à long
    }
}