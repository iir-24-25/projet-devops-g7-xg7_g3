package com.bitkal.backend.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeanceProfesseurDTO {
    private String nom;
    private String prenom;
    private String titre;
    private String salle;
    private String filiere;
    private String niveau;
    private String seance;
}
