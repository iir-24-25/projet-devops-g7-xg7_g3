package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Filiere;
import com.bitkal.backend.constant.Niveau;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@DiscriminatorValue("ETUD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends Personne {

    @Column(name = "niveau")
    @Enumerated(EnumType.STRING)
    private Niveau niveau;

    @Column(name = "address_MAC", length = 50, nullable = true, unique = true)
    private String addressMAC;

    @Column(name = "filiere", length = 5)
    @Enumerated(EnumType.STRING)
    private Filiere filiere;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonBackReference
    private Group group;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Absences> absences;

    @ManyToOne
    @JoinColumn(name = "parents_id")
    @JsonBackReference
    private Parents parents;
}