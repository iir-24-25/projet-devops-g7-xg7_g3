package com.bitkal.backend.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import com.bitkal.backend.model.doc.SearchSystemDoc;

import java.util.List;

public interface SearchSystemRepo extends ElasticsearchRepository<SearchSystemDoc, String> {
    List<SearchSystemDoc> findByContentContaining(String query);
}
