package com.bitkal.backend.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllAbsenceEtudDTO {
    private String nom;
    private String prenom;
    private String moduleTitre;
    private String semestre;
    private String dateAbsences;
    private String salle;
    private String  isJustif;
    // private Seances seance;
}