package com.bitkal.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module __module;

    @ManyToOne
    @JoinColumn(name = "professeur_id")
    private Professeur __professeur;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group __group;

    @OneToOne
    @JoinColumn(name = "emploi_temps_id")
    private EmploiTemps __emploiTemps;
}