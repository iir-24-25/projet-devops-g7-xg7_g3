package com.bitkal.backend.controller;

import com.bitkal.backend.model.dto.LoginDTO;
import com.bitkal.backend.model.dto.LoginResponseDTO;
import com.bitkal.backend.model.dto.PasswordRequestDTO;
import com.bitkal.backend.service.PersonneService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class PersonneController {

    @Autowired
    private PersonneService personneService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        Optional<LoginResponseDTO> response = personneService.login(loginDTO.getEmail(), loginDTO.getPassword());
        
        if (response.isPresent()) {
            return ResponseEntity.ok(response.get());
        } else {
            return ResponseEntity.status(401)
                    .body("Email ou mot de passe incorrect");
        }
    }

    @GetMapping("/reset-password")
    public ResponseEntity<Integer> sendResetCode(@RequestParam String email) {
        try {
            int code = personneService.envoyerEmailAvecNumeroTemporaire(email);
            return ResponseEntity.ok(code);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body(-1); // Retourne -1 en cas d'erreur d'envoi
        }
    }

    @GetMapping("/findEmail")
    public ResponseEntity<?> findByEmail(@RequestParam String email) {
        boolean response = personneService.findByEmail(email);
        if (response) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Email incorrect");
    }

    @PostMapping("/modifierPassword")
    public ResponseEntity<?> setPasswordByEmail(@RequestBody PasswordRequestDTO passwordRequestDTO) {
        boolean response = personneService.setPasswordById(passwordRequestDTO.getId(), passwordRequestDTO.getPassword());
        if (response) { // Inversion de la logique : succès si true
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Le mot de passe n'a pas été modifié");
    }

    @GetMapping("/numberGender")
    public ResponseEntity<Map<String, Integer>> numberGenderByType(@RequestParam String type) {
        try {
            Map<String, Integer> result = personneService.numberGenderByType(type);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/numberPersonneByType")
    public ResponseEntity<Map<String, Integer>> numberPersonneByType() {
        Map<String, Integer> result = personneService.numberPersonneByType();
        return ResponseEntity.ok(result);
    }
}