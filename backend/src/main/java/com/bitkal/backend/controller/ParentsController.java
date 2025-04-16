package com.bitkal.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.model.dto.ParentInfoDTO;
import com.bitkal.backend.service.ParentsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ParentsController {
    @Autowired
    private ParentsService parentsService;

    @GetMapping("parents/info")
    public ParentInfoDTO findInfoParent(@RequestParam(required = true) Long idParent) {
        return parentsService.findInfoParent(idParent);
    }
}
