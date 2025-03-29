package com.bitkal.backend.model.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitkal.backend.model.entity.Absences;

public interface AbsencesRepo extends JpaRepository<Absences, Long> , AbsencesRepoCustom {
    @Query("SELECT FUNCTION('DAY', a.dateAbsences) AS jour, COUNT(a) " +
           "FROM Absences a " +
           "WHERE a.dateAbsences BETWEEN :startOfWeek AND :endOfWeek " +
           "GROUP BY FUNCTION('DAY', a.dateAbsences) " +
           "ORDER BY jour")
    List<Object[]> countAbsencesPerDay(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);

    @Query("SELECT COUNT(a) FROM Absences a WHERE a.dateAbsences BETWEEN :startOfMonth AND :endOfMonth" )
    List<Object[]> countAbsencesPerMonth(@Param("startOfMonth") Date startMonth, @Param("endOfMonth") Date endOfMonth);
}
