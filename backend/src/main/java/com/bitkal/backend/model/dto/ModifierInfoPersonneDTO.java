package com.bitkal.backend.model.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModifierInfoPersonneDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private String ville;
    private byte[] image;
}
