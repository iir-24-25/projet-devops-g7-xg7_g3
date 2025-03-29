package com.bitkal.backend.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "justification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Justification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Lob
    private byte[] document;

    private LocalDate dateSoumission;

    @OneToOne
    @JoinColumn(name = "absence_id")
    private Absences absence;
}
