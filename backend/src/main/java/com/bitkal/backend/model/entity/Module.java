package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Filiere;
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
    private Long id;

    @Column(name = "titre", length = 50, nullable = false)
    private String titre;

    @Column(name = "filiere", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private Filiere filiere;

    @Column(name = "niveau", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private Niveau niveau;

    @Column(name = "semestre")
    @Enumerated(EnumType.STRING)
    private Semestre semestre;

    @Column(name = "weekly_hours", nullable = false)
    private int WeeklyHours;

    @Column(name = "is_pratique")
    private Boolean isPratique;

    @OneToMany(mappedBy = "module")
    @JsonManagedReference
    private List<Cours> cours;

    @OneToMany(mappedBy = "module")
    @JsonManagedReference
    private List<Seance> seances;

    @ManyToMany(mappedBy = "modules")
    private List<Group> groups;

}