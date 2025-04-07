package com.bitkal.backend.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Group;

@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {
    @Query("SELECT g FROM Group g " +
           "LEFT JOIN FETCH g.etablissement " +
           "LEFT JOIN FETCH g.etudiants " +
           "LEFT JOIN FETCH g.emploisTemp " +
           "LEFT JOIN FETCH g.modules")
    Page<Group> findAllWithRelations(Pageable pageable);

    @Query("SELECT g.id FROM Group g WHERE g IN " +
       "(SELECT g2 FROM Group g2 JOIN g2.modules m JOIN m.cours c WHERE c.professeur.id = :professorId)")
    List<Long> findGroupsIdsByProfessorId(@Param("professorId") Long professorId);

}