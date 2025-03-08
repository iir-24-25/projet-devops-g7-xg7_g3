package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Filiere;
import com.bitkal.backend.constant.Niveau;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Represents a student group in the system.
 */
@Entity
@Table(name = "groups")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 4, nullable = false)
    private String __sName;

    @Column(name = "filiere")
    @Enumerated(EnumType.STRING)
    private Filiere __eFiliere;

    @Column(name = "niveau")
    @Enumerated(EnumType.STRING)
    private Niveau __eNiveau;

    @OneToMany(mappedBy = "group")
    private List<Etudiant> __etudiants;

    @ManyToMany
    @JoinTable(
        name = "group_module",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "module_id")
    )
    private List<Module> __modules;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement __etablissement;

}