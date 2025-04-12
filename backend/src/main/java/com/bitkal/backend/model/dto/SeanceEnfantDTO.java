package com.bitkal.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeanceEnfantDTO {
    private String titre;
    private String salle;
    private String nameGroup;
    private String filiere;
    private String niveau;
    private String semestre;
    private String jour;
    private String seance;
}