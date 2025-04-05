package com.bitkal.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.bitkal.backend.constant.Gender;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "persons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected Long id;

    @Column(name = "nom", length = 50, nullable = false)
    protected String nom;

    @Column(name = "prenom", length = 50, nullable = false)
    protected String prenom;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    protected String email;

    @Column(name = "password", length = 100, nullable = false)
    protected String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 6, nullable = false)
    protected Gender gender = Gender.MALE;

    @Column(name = "ville", length = 25, nullable = true)
    protected String ville;

    @Column(name = "tel", length = 12, nullable = true)
    protected String tel;

    @Lob
    @Column(name = "image")
    protected byte[] image;

    @Lob
    @Column(name = "emprunt", nullable = true)
    protected byte[] emprunt;

    @Column(name = "is_login")
    protected boolean isLogin;

    @OneToMany(mappedBy = "personne")
    @JsonManagedReference
    protected List<Notifications> notifications;

}