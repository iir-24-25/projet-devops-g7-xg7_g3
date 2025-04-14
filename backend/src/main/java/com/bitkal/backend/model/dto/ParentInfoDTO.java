package com.bitkal.backend.model.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Builder
public class ParentInfoDTO {
    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private byte[] image;
    private String ville;

    public ParentInfoDTO(String nom, String prenom, String email, String tel, byte[] image, String ville) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.tel = tel;
        this.image = image;
        this.ville = ville;
    }
}