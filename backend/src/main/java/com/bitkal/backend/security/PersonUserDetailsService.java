package com.bitkal.backend.security;

import com.bitkal.backend.model.entity.Personne;
import com.bitkal.backend.model.repository.PersonneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class PersonUserDetailsService implements UserDetailsService {

    @Autowired
    private PersonneRepo personneRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Personne personne = personneRepo.findPersonByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + email));
        
        return new User(personne.getEmail(), personne.getPassword(), Collections.emptyList());
    }
}