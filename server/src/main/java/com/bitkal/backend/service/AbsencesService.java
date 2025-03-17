package com.bitkal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.model.repository.AbsencesRepo;

import jakarta.transaction.Transactional;

@Service
public class AbsencesService {
    @Autowired
    private AbsencesRepo absencesRepo;

    @Transactional
    public String ajouterAbsence(Long idEtudiant, Salle salle, Long idEmploi) {
        return absencesRepo.ESPInsertAbsance(idEtudiant, salle, idEmploi);
    }
}
