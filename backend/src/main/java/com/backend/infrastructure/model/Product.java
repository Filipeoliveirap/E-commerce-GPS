package com.backend.infrastructure.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private String id;

    private String name;
    private String description;
    private Double price;
    private Double originalPrice;
    private String image;
    private Double rating;
    private Integer reviews;
    private Integer discount;
    private String category;
    private Boolean inStock;
}