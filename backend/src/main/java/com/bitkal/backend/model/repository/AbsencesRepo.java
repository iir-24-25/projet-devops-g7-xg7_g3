package com.bitkal.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitkal.backend.model.entity.Absences;

public interface AbsencesRepo extends JpaRepository<Absences, Long> , AbsencesRepoCustom {}
