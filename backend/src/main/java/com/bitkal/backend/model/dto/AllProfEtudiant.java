package com.bitkal.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllProfEtudiant {
    private String nom;
    private String prenom;
    private String email;
    private String titre;
    private byte[] image;
}
