package com.bitkal.backend.repository;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchSystemRepo extends ElasticsearchRepository<SearchSystemDoc, String> {
}