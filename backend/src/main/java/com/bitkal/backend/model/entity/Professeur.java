package com.bitkal.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@DiscriminatorValue("PROF")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Professeur extends Personne {

    @Column(name = "specialisation", length = 20, nullable = true)
    private String specialisation;

    @OneToMany(mappedBy = "professeur")
    private List<Cours> cours;
}