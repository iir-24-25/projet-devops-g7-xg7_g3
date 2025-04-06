package com.bitkal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.model.entity.Group;
import com.bitkal.backend.service.GroupService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping("/group/prof")
    public List<Group> findGroupsByProfessorId(@RequestParam Long idProf) {
        return groupService.findGroupsByProfessorId(idProf);
    }
    
}
