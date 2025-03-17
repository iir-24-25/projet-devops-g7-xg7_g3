package com.bitkal.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.constant.Gender;
import com.bitkal.backend.model.dto.LoginDTO;
import com.bitkal.backend.model.entity.Personne;
import com.bitkal.backend.service.PersonneService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class PersonneController {
    @Autowired
    private PersonneService personneService;

    @GetMapping("/numberGender")    
    public Map<String, Integer> numberGenderByType(@RequestParam String type, @RequestParam String gender){
        Gender genderEnum = Gender.valueOf(gender.toUpperCase());
        return personneService.numberGenderByType(type, genderEnum);
    }

    @PostMapping("/login")
    public Personne login(@RequestBody LoginDTO login ) {
        return personneService.login(login.get__sEmail(), login.get__sPassword());
    }
    @GetMapping("/numberPersonneByType")
    public Map<String, Integer> getMethodName() {
        return personneService.numberPersonneByType();
    }
     
    
}
