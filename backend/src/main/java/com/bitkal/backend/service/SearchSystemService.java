package com.bitkal.backend.service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.elasticsearch.core.query.StringQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchSystemService {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    public List<SearchSystemDoc> search(String keyword) {
        // Ne pas inclure "query" dans la chaîne, juste la sous-requête
        String queryString = String.format("{\"multi_match\":{\"query\":\"%s\",\"fields\":[\"content\"],\"fuzziness\":\"AUTO\"}}", keyword);
        Query searchQuery = new StringQuery(queryString);

        SearchHits<SearchSystemDoc> searchHits = elasticsearchOperations.search(
                searchQuery, SearchSystemDoc.class);

        return searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }
}