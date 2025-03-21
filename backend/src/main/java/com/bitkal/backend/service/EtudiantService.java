package com.bitkal.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.constant.Seances;
import com.bitkal.backend.constant.Semestre;
import com.bitkal.backend.model.dto.ESPStudentDTO;
import com.bitkal.backend.model.entity.Etudiant;
import com.bitkal.backend.model.repository.EtudiantRepo;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepo etudiantRepo;

    public List<ESPStudentDTO> findEtudiantsForTimetable(Jours jour, Salle salle, Seances seance, Semestre semestre) {
        List<Etudiant> etudiants = etudiantRepo.findEtudiantsForTimetable(jour, salle, seance, semestre);
        return etudiants.stream()
                .map(e -> new ESPStudentDTO(e.getId(), e.get__sAddressMAC()))
                .collect(Collectors.toList());
    }


}