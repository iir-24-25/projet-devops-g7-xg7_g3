package com.bitkal.backend.model.entity;

import java.util.List;

import com.bitkal.backend.constant.Jours;
import com.bitkal.backend.constant.Salle;
import com.bitkal.backend.constant.Seances;
import com.bitkal.backend.constant.Semestre;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "emploi_temps", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"jour", "salle", "seance", "semestre"}))
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
    private Jours jour;

    @Column(name = "salle")
    @Enumerated(EnumType.STRING)
    private Salle salle;

    @Column(name = "seance")
    @Enumerated(EnumType.STRING)
    private Seances seance;

    @Column(name = "semestre")
    @Enumerated(EnumType.STRING)
    private Semestre semestre;

    @ManyToOne
    @JoinColumn(name = "groupe_id")
    private Group groupe;

    @OneToMany(mappedBy = "emploiTemp")
    @JsonManagedReference
    private List<Seance> seances;
}