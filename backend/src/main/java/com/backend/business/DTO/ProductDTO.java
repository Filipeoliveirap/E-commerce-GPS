package com.backend.business.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

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