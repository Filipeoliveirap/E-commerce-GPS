package com.backend.business.mappers;

import com.backend.business.DTO.ProductDTO;
import com.backend.infrastructure.model.Product;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .image(product.getImage())
                .rating(product.getRating())
                .reviews(product.getReviews())
                .discount(product.getDiscount())
                .category(product.getCategory())
                .inStock(product.getInStock())
                .build();
    }

    public static Product toEntity(ProductDTO dto) {
        return Product.builder()
                .id(dto.getId()) 
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .image(dto.getImage())
                .rating(dto.getRating())
                .reviews(dto.getReviews())
                .discount(dto.getDiscount())
                .category(dto.getCategory())
                .inStock(dto.getInStock())
                .build();
    }
}