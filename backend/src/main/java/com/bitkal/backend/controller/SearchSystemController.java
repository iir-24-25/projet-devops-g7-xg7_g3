package com.bitkal.backend.controller;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.service.SearchSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchSystemController {

    @Autowired
    private SearchSystemService searchService;

    @GetMapping("/search/global")
    public ResponseEntity<List<SearchSystemDoc>> globalSearch(@RequestParam String keyword) {
        List<SearchSystemDoc> results = searchService.search(keyword);
        return ResponseEntity.ok(results);
    }
}