package com.bitkal.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ESPAbsencesDTO {
        public Long idEtudiant;
        public String salle;
        public Long idEmploi;
}
