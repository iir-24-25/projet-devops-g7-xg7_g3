package com.bitkal.backend.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.repository.SearchSystemRepo;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchSystemService {
    private final SearchSystemRepo searchSystemRepo;
    private final ElasticsearchClient elasticsearchClient;

    @Autowired
    public SearchSystemService(SearchSystemRepo searchSystemRepo, 
                             ElasticsearchClient elasticsearchClient) {
        this.searchSystemRepo = searchSystemRepo;
        this.elasticsearchClient = elasticsearchClient;
    }

    public List<SearchSystemDoc> searchAllTables(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        // Essayer d'abord avec Spring Data
        List<SearchSystemDoc> results = searchSystemRepo.searchAllFields(query);
        
        // Fallback direct avec ElasticsearchClient si vide
        if (results.isEmpty()) {
            results = searchWithElasticsearchClient(query);
        }
        
        return results;
    }

    private List<SearchSystemDoc> searchWithElasticsearchClient(String query) {
        try {
            SearchResponse<SearchSystemDoc> response = elasticsearchClient.search(s -> s
            .index("system_search")
            .query(q -> q
                .bool(b -> b
                    .should(sh -> sh
                        .wildcard(w -> w
                            .field("content")
                            .value("*" + query + "*")
                        )
                    )
                    .should(sh -> sh
                        .wildcard(w -> w
                            .field("relationName")
                            .value("*" + query + "*")
                        )
                    )
                    .minimumShouldMatch("1")
                )
            ),
            SearchSystemDoc.class);


            return response.hits().hits().stream()
                .map(hit -> hit.source())
                .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Elasticsearch search failed", e);
        }
    }
}