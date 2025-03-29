package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Filiere;
import com.bitkal.backend.constant.Niveau;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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
    private String name;

    @Column(name = "filiere")
    @Enumerated(EnumType.STRING)
    private Filiere filiere;

    @Column(name = "niveau")
    @Enumerated(EnumType.STRING)
    private Niveau niveau;

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private Etablissement etablissement;

    @OneToMany(mappedBy = "group")
    private List<Etudiant> etudiants;

    @OneToMany(mappedBy = "groupe")
    private List<EmploiTemps> emploisTemp;

    @ManyToMany
    @JoinTable(
        name = "group_module",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "module_id")
    )
    private List<Module> modules;
}