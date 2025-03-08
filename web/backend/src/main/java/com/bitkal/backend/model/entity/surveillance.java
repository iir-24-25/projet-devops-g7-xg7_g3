package com.bitkal.backend.model.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SURV")
public class Surveillance extends Personne {
}
