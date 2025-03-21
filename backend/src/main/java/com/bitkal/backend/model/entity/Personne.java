package com.bitkal.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Blob;

import com.bitkal.backend.constant.Gender;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 6, nullable = false)
    protected Gender _eGender = Gender.MALE;

    @Column(name = "ville", length = 25, nullable = true)
    protected String _sVille;

    @Column(name = "tel", length = 12, nullable = true)
    protected String _sTel;

    @Column(name = "image")
    protected Blob _blImage;

    @Column(name = "is_login")
    private boolean _isLogin;

}