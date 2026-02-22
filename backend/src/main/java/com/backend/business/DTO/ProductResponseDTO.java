package com.backend.business.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {

    private String id;

    private String name;

    private String description;

    private Double price;

    private Double originalPrice;

    private String image;

    private String category;

    private Boolean inStock;
}