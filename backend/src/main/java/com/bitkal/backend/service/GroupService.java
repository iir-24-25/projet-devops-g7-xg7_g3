package com.bitkal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.model.entity.Group;
import com.bitkal.backend.repository.GroupRepo;

@Service
public class GroupService {
    @Autowired
    private GroupRepo groupRepo;

    public List<Group> findGroupsByProfessorId(Long idProf){
        return groupRepo.findGroupsByProfessorId(idProf);
    }
}
