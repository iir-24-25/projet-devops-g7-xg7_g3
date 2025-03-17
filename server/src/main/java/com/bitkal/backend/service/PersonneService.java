package com.bitkal.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.constant.Gender;
import com.bitkal.backend.model.entity.Etudiant;
import com.bitkal.backend.model.entity.Personne;
import com.bitkal.backend.model.repository.PersonneRepo;

@Service
public class PersonneService {
    @Autowired
    private PersonneRepo personneRepo;

    public Map<String, Integer> numberGenderByType(String type, Gender gender){
        Class<? extends Personne> types;
        switch (type.toUpperCase()) {
            case "ETUD":
                types = Etudiant.class;
                break;
            default:
                throw new IllegalArgumentException("Type inconnu : " + type);
        }
        
        List<Object[]> results = personneRepo.numberEtudiantByType(types);
        Map<String, Integer> genderCountMap = new HashMap<>();
        
        for (Object[] result : results) {
            String genderStr = result[0].toString();  // Conversion en String
            Integer count = ((Number) result[1]).intValue();  // Conversion en Integer
            genderCountMap.put(genderStr, count);
        }
        
        return genderCountMap;
    }


    public Personne login(String email, String password){
        return personneRepo.login(email, password);
    }

    public Map<String, Integer> numberPersonneByType(){
        List<Object[]> results = personneRepo.numberPersonneByType();
        
        // Convertir les résultats en une Map<String, Integer>
        Map<String, Integer> resultMap = new HashMap<>();
        
        for (Object[] row : results) {
            // row[0] : TYPE(p) (la classe de l'entité)
            // row[1] : COUNT(p) (le nombre d'instances)
            String typeName = ((Class<?>) row[0]).getSimpleName(); // Obtenir le nom simple de la classe
            Integer count = ((Number) row[1]).intValue(); // Convertir en Integer
            
            resultMap.put(typeName, count);
        }
        
        return resultMap;
    }
    

}
