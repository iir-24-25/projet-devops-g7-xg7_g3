package com.bitkal.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Blob;

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
    protected String _sNom;

    @Column(name = "prenom", length = 50, nullable = false)
    protected String _sPrenom;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    protected String _sEmail;

    @Column(name = "password", length = 100, nullable = false)
    protected String _sPassword;

    @Column(name = "ville", length = 25, nullable = true)
    protected String _sVille;

    @Column(name = "tel", length = 12, nullable = true)
    protected String _sTel;

    @Column(name = "image")
    protected Blob _blImage;
}