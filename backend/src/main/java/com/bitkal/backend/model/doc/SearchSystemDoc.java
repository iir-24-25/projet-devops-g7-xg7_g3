package com.bitkal.backend.model.doc;

import java.sql.Date;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(indexName = "system_search")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SearchSystemDoc {
    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Date)
    private Date date;

    @Field(type = FieldType.Keyword)
    private String relationId;

    @Field(type = FieldType.Text)
    private String relationName;
}
