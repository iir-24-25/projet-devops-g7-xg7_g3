package com.bitkal.backend.model.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// import com.bitkal.backend.constant.Gender;
import com.bitkal.backend.model.entity.Personne;

public interface PersonneRepo extends JpaRepository<Personne, Long> {
    @Query("SELECT p._eGender, COUNT(p) FROM Personne p WHERE TYPE(p) IN :type GROUP BY p._eGender")
    List<Object[]> numberEtudiantByType(@Param("type") Class<? extends Personne> type);

    @Query("SELECT p FROM Personne p WHERE p._sEmail = :email AND p._sPassword = :password")
    Personne login(@Param("email") String email, @Param("password") String password);

    @Query("SELECT TYPE(p), COUNT(p) FROM Personne p GROUP BY TYPE(p)")
    List<Object[]> numberPersonneByType();
}
