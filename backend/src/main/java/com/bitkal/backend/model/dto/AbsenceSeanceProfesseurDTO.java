package com.bitkal.backend.model.dto;


import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AbsenceSeanceProfesseurDTO {
    private Long idAbsences;
    private Date dateAbsences;
    private Boolean isJustifAbsences;
    private Long idJustification;
    private String descriptionJustification;
    private byte[] documentJustification;
    private String nomEtud;
    private String prenomEtud;
    private String nomModule;
    private String titreModule;
}
