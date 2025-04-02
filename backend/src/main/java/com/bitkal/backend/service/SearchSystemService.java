package com.bitkal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.repository.SearchSystemRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchSystemService {
    
    private final SearchSystemRepo searchSystemRepo;

    public List<SearchSystemDoc> searchAllTables(String query){
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        return searchSystemRepo.findByContentContaining(query);
    }

}
