package com.bitkal.backend.model.entity;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("PAR")
public class Parents extends Personne {
    
    @OneToMany(mappedBy = "parents")
    private List<Etudiant> etudiants;
}
