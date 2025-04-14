package com.bitkal.backend.service;

import com.bitkal.backend.model.dto.ParentInfoDTO;
import com.bitkal.backend.repository.ParentsRepo;

import jakarta.persistence.Tuple;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ParentsService {

    @Autowired
    private ParentsRepo parentsRepo;

    public ParentInfoDTO findInfoParent(Long idParent) {
        Tuple tuple = parentsRepo.findInfoParent(idParent);
        return ParentInfoDTO.builder()
            .nom(tuple.get(0, String.class))
            .prenom(tuple.get(1, String.class))
            .email(tuple.get(2, String.class))
            .tel(tuple.get(3, String.class))
            .image(tuple.get(4, byte[].class))
            .ville(tuple.get(5, String.class))
            .build();
    }
    public boolean updateParentInfo(Long id, String nom, String prenom, String email, String tel, String ville) {
        try {
            int updatedRows = parentsRepo.updateParentInfo(nom, prenom, email, tel, ville, id);
            return updatedRows > 0;
        } catch (Exception e) {
            throw new RuntimeException("Échec de la mise à jour du parent", e);
        }
    }
}