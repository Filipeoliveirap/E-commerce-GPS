package com.backend.business.mappers;

import com.backend.business.DTO.ProductCreateDTO;
import com.backend.business.DTO.ProductDTO;
import com.backend.business.DTO.ProductResponseDTO;
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
                .category(product.getCategory())
                .inStock(product.getInStock())
                .build();
    }

    public static Product toEntity(ProductCreateDTO dto) {
        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .image(dto.getImage())
                .category(dto.getCategory())
                .inStock(dto.getInStock())
                .build();
    }

    public static ProductResponseDTO toResponseDTO(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .image(product.getImage())
                .category(product.getCategory())
                .inStock(product.getInStock())
                .build();
    }
}