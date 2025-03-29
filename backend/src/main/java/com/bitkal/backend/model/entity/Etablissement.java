package com.bitkal.backend.model.entity;

import com.bitkal.backend.constant.Ville;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Represents an educational establishment in the system.
 */
@Entity
@Table(name = "etablissement")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etablissement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 25, nullable = false)
    private String name;

    @Column(name = "ville")
    @Enumerated(EnumType.STRING)
    private Ville ville;

    @OneToMany(mappedBy = "etablissement")
    private List<Group> groups;
}