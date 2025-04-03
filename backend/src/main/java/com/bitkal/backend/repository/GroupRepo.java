package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}