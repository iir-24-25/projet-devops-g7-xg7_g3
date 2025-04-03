package com.bitkal.backend.repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.bitkal.backend.model.doc.SearchSystemDoc;

import java.util.List;

public interface SearchSystemRepo extends ElasticsearchRepository<SearchSystemDoc, String> {

    // Version corrigée avec syntaxe exacte
    @Query("{\"bool\": {\"should\": [" +
       "{\"wildcard\": {\"content\": \"*?0*\"}}," +
       "{\"wildcard\": {\"relationName\": \"*?0*\"}}," +
       "{\"term\": {\"relationId\": \"?0\"}}" +
       "]}}")
    List<SearchSystemDoc> searchAllFields(String query);


}