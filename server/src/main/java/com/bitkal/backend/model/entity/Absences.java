package com.bitkal.backend.model.entity;

import java.util.Date;
import com.bitkal.backend.constant.Salle;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

/**
 * Represents an absence record for a student in the system.
 */
@Entity
@Table(name = "absences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Absences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonBackReference
    private Etudiant __etudiant;

    @Column(name = "date_absence")
    private Date __dateAbsences;

    @Builder.Default
    @Column(name = "is_justified")
    private boolean __bIsJustif = false;

    @Column(name = "description", nullable = true)
    private String __sDesciption;

    @Column(name = "salle")
    @Enumerated(EnumType.STRING)
    private Salle __eSalle;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module __module;

    @ManyToOne
    @JoinColumn(name = "emploi_temps_id")
    private EmploiTemps __emploiTemps;
}