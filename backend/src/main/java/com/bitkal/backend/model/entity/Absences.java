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

    @Column(name = "date_absence")
    private Date dateAbsences;

    @Column(name = "is_justif") // Ajouté
    private Boolean isJustif;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonBackReference
    private Etudiant etudiant;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private Seance seance;

    @OneToOne(mappedBy = "absences")
    private Notifications notification;

    @OneToOne(mappedBy = "absence")
private Justification justification;

    @Column(name = "salle")
    @Enumerated(EnumType.STRING)
    private Salle salle;
}