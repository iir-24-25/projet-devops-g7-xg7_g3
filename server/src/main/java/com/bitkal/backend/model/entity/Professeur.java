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

    @OneToMany(mappedBy = "professeur")
    private List<Module> __modules;
}