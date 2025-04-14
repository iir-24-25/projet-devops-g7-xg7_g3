package com.bitkal.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PasswordOldRequestDTO {
    private Long idPersonne;
    private String passwordNew;
    private String passwordOld;
}
