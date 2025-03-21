package com.bitkal.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Blob;
import java.util.List;

@Entity
@DiscriminatorValue("ETUD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends Personne {

    @Column(name = "niveau")
    private String __sNiveau;

    @Column(name = "address_MAC", length = 50, nullable = true, unique = true)
    private String __sAddressMAC;

    @Column(name = "emprunt", nullable = true)
    private Blob __blEmprunt;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonBackReference
    private Group group;

    @OneToMany(mappedBy = "__etudiant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Absences> __listAbsences;
}