package com.bitkal.backend.model.repository;

import com.bitkal.backend.model.dto.LoginResponseDTO;
// import com.bitkal.backend.model.dto.LoginResult;
import com.bitkal.backend.model.entity.Personne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PersonneRepo extends JpaRepository<Personne, Long> {
    //login
    @Query("SELECT NEW com.bitkal.backend.model.dto.LoginResponseDTO(TYPE(p), p.id, p._isLogin) " +
           "FROM Personne p WHERE p._sEmail = :email AND p._sPassword = :password")
    Optional<LoginResponseDTO> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    //
    @Query("SELECT COUNT(p) FROM Personne p WHERE p._sEmail = :email")
    int findByEmail(@Param("email") String email);

    //
    @Query("UPDATE Personne p set p._sPassword = :password where p.id = :id")
    boolean setPasswordById(@Param("id") int id, @Param("password") String password);
    
    // Compte le nombre d'étudiants par genre pour un type donné
    @Query("SELECT p._eGender, COUNT(p) FROM Personne p WHERE TYPE(p) IN :type GROUP BY p._eGender")
    List<Object[]> numberEtudiantByType(@Param("type") Class<? extends Personne> type);

    // Compte le nombre de personnes par type
    @Query("SELECT TYPE(p), COUNT(p) FROM Personne p GROUP BY TYPE(p)")
    List<Object[]> numberPersonneByType();
}