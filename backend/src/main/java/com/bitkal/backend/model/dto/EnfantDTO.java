package com.bitkal.backend.model.dto;

import com.bitkal.backend.constant.Filiere;
import com.bitkal.backend.constant.Gender;
import com.bitkal.backend.constant.Niveau;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EnfantDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private Gender gender;
    private Niveau niveau;
    private String addressMAC;
    private Filiere filiere;
    private byte[] image;
}
