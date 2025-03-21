package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Niveau;
import com.bitkal.backend.constant.Semestre;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Represents a module entity in the educational system.
 */
@Entity
@Table(name = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long __lIdModule;

    @Column(name = "niveau_string", length = 50, nullable = false)
    private String __sNiveau;

    @Column(name = "titre", length = 50, nullable = false)
    private String __sTitre;

    @Column(name = "semestre")
    @Enumerated(EnumType.STRING)
    private Semestre __eSemestre;

    @Column(name = "niveau_enum")
    @Enumerated(EnumType.STRING)
    private Niveau __eNiveau;

    @Column(name = "weekly_hours", nullable = false)
    private int __iWeeklyHours;

    @Column(name = "is_pratique")
    private boolean __bIsPratique;

    @ManyToMany(mappedBy = "__modules")
    private List<Group> __groups;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<EmploiTemps> __emploiTemps;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement __etablissement;

    @ManyToOne
    private Professeur professeur;
}