package com.bitkal.backend.model.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PAR")
public class Parents extends Personne {
}
