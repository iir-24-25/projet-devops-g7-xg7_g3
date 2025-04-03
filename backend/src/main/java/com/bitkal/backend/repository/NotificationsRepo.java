package com.bitkal.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitkal.backend.model.entity.Notifications;

@Repository
public interface NotificationsRepo extends JpaRepository<Notifications, Long> {
    @Query("SELECT n FROM Notifications n " +
           "LEFT JOIN FETCH n.personne " +
           "LEFT JOIN FETCH n.absences")
    Page<Notifications> findAllWithRelations(Pageable pageable);
}