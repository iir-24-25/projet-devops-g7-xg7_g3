package com.bitkal.backend.repository;

import com.bitkal.backend.model.dto.LoginResponseDTO;
import com.bitkal.backend.model.entity.Personne;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PersonneRepo extends JpaRepository<Personne, Long> {
    
    @Query("SELECT NEW com.bitkal.backend.model.dto.LoginResponseDTO(TYPE(p), p.id, p.isLogin) " +
           "FROM Personne p WHERE p.email = :email AND p.password = :password")
    Optional<LoginResponseDTO> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT COUNT(p) FROM Personne p WHERE p.email = :email")
    int findByEmail(@Param("email") String email);

    @Modifying
    @Query("UPDATE Personne p set p.password = :password where p.email = :email")
    int setPasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE Personne p SET p.password = :passwordNew WHERE p.id = :idPersonne")
    int setPasswordByPasswordOld(@Param("idPersonne") Long idPersonne, @Param("passwordNew") String passwordNew);

    @Query("SELECT p FROM Personne p WHERE p.email = :email") // Nouvelle méthode pour trouver par email
    Optional<Personne> findPersonByEmail(@Param("email") String email);

    @Query("SELECT p.gender, COUNT(p) FROM Personne p WHERE TYPE(p) IN :type GROUP BY p.gender")
    List<Object[]> numberEtudiantByType(@Param("type") Class<? extends Personne> type);

    @Query("SELECT TYPE(p), COUNT(p) FROM Personne p GROUP BY TYPE(p)")
    List<Object[]> numberPersonneByType();

    @Query("SELECT g.filiere, COUNT(p.id) FROM Personne p INNER JOIN p.group g GROUP BY g.filiere")
    List<Object[]> findFilierePersonCount(Pageable pageable);

    @Query("SELECT p FROM Personne p WHERE p.id = :id")
    Personne getFullNameAndEmailById(@Param("id") Long id);

    @Query("SELECT p FROM Personne p WHERE TYPE(p) = Admin AND p.id <> :id")
    List<Personne> getListAdmin(@Param("id") Long id);

    @Query("SELECT COUNT(p) FROM Personne p JOIN p.group g WHERE TYPE(p) = 'Etud' AND g.id IN :groupIds")
    int findCountEtudDansProf(@Param("groupIds") List<Long> groupIds);

    @Modifying
    @Query("UPDATE Personne p SET p.nom = :nom, p.prenom = :prenom, p.email = :email, p.tel = :tel, p.ville = :ville, p.image = :image WHERE p.id = :id")
    int setInfoPersonne(@Param("id") Long id, @Param("nom") String nom, 
                        @Param("prenom") String prenom, @Param("email") String email, 
                        @Param("tel") String tel, @Param("ville") String ville, @Param("image") byte[] image);
}