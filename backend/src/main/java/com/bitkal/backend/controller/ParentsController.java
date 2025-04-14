package com.bitkal.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.model.dto.ParentInfoDTO;
import com.bitkal.backend.service.ParentsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ParentsController {
    @Autowired
    private ParentsService parentsService;

    @GetMapping("parents/info")
    public ParentInfoDTO findInfoParent(@RequestParam(required = true) Long idParent) {
        return parentsService.findInfoParent(idParent);
    }
    
    @PutMapping("parents/{id}/updateInfo")
    public ResponseEntity<String> updateParentInfo(
            @PathVariable Long id,
            @RequestParam String nom,
            @RequestParam String prenom,
            @RequestParam String email,
            @RequestParam String tel,
            @RequestParam String ville) {
        try {
            boolean updated = parentsService.updateParentInfo(id, nom, prenom, email, tel, ville);
            if (updated) {
                return ResponseEntity.ok("Informations du parent mises à jour avec succès");
            } else {
                return ResponseEntity.status(404).body("Parent avec l'ID " + id + " non trouvé");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }
}
