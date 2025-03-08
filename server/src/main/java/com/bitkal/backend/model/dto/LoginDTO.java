package com.bitkal.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDTO {
    @Email(message = "Email must be a valid email address")
    @NotBlank(message = "Email cannot be empty")
    private String __sEmail;

    @NotBlank(message = "Password cannot be empty")
    private String __sPassword;
}
