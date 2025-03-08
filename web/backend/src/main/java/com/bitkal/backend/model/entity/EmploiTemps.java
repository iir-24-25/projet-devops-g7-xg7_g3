package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.constant.Seances;
import com.bitkal.backend.constant.Semestre;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a timetable entry in the system.
 */
@Entity
@Table(name = "emploi_temps")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmploiTemps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "jour")
    @Enumerated(EnumType.STRING)
    private Jours __eJour;

    @Column(name = "salle")
    @Enumerated(EnumType.STRING)
    private Salle __eSalle;

    @Column(name = "seance")
    @Enumerated(EnumType.STRING)
    private Seances __eSeance;

    @Column(name = "semestre")
    @Enumerated(EnumType.STRING)
    private Semestre __eSemestre;

    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module __module;
}