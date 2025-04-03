package com.bitkal.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.service.SearchSystemService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
public class SearchSystemController {
    
    private final SearchSystemService searchSystemService;

    @GetMapping("/searchSystem/All")
    public List<SearchSystemDoc> getMethodName(@RequestParam String query) {
        return searchSystemService.searchAllTables(query);
    }
}
