package com.bitkal.backend.repository;

import com.bitkal.backend.constant.Salle;

public interface AbsencesRepoCustom {
    
    String ESPInsertAbsance(long idEtudiant, Salle salle, Long idEmploi);
}
