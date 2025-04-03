package com.bitkal.backend.controller;

import com.bitkal.backend.model.dto.InfoAdminDTO;
import com.bitkal.backend.model.dto.LoginDTO;
import com.bitkal.backend.model.dto.PasswordRequestDTO;
import com.bitkal.backend.security.JwtUtils;
import com.bitkal.backend.service.PersonneService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class PersonneController {

    @Autowired
    private PersonneService personneService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            // Authentification de l'utilisateur
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            
            // Récupération des informations supplémentaires
            Long userId = personneService.getUserIdByEmail(authentication.getName());
            String userType = personneService.getUserTypeByEmail(authentication.getName());
            Boolean isLogin = true; // On suppose que l'utilisateur est connecté si l'authentification réussit
            
            // Génération du token avec toutes les informations
            String token = jwtUtils.generateToken(
                authentication.getName(), 
                userId, 
                userType, 
                isLogin
            );
            
            // Construction de la réponse
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userType", userType);
            response.put("userId", userId);
            response.put("isLogin", isLogin);
            
            return ResponseEntity.ok(response);
            
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }
    }

    // Les autres méthodes restent inchangées
    @GetMapping("/reset-password")
    public ResponseEntity<Integer> sendResetCode(@RequestParam String email) {
        try {
            int code = personneService.envoyerEmailAvecNumeroTemporaire(email);
            return ResponseEntity.ok(code);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body(-1);
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
        boolean response = personneService.setPasswordByEmail(passwordRequestDTO.getEmail(), passwordRequestDTO.getPassword());
        if (response) {
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

    @GetMapping("/numberPersonneByFiliere")
    public ResponseEntity<Map<String, Integer>> findFilierePersonCount() {
        Map<String, Integer> result = personneService.findFilierePersonCount();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/info/admin")
    public InfoAdminDTO getFullNameAndEmailById(@RequestParam Long id) {
        return personneService.getFullNameAndEmailById(id);
    }
    
    @GetMapping("/list/admin")
    public List<InfoAdminDTO> getListAdmin(@RequestParam long id ){
        return personneService.getListAdmin(id);
    }
}