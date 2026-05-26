package com.backend.business.service;

import com.backend.business.DTO.*;
import com.backend.business.mappers.PageMapper;
import com.backend.business.mappers.ProductMapper;
import com.backend.infrastructure.model.Product;
import com.backend.infrastructure.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;



    public ProductDTO findById(String id) {
    Product product = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    return ProductMapper.toDTO(product);
    }

    
    public List<ProductDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .toList();
    }


    public ProductResponseDTO create(ProductCreateDTO dto) {
        Product product = ProductMapper.toEntity(dto);
        product.setId(null);
        Product saved = repository.save(product);
        return ProductMapper.toResponseDTO(saved);
    }


    public ProductResponseDTO update(String id, ProductUpdateDTO dto) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setImage(dto.getImage());
        product.setCategory(dto.getCategory());
        product.setInStock(dto.getInStock());

        Product updated = repository.save(product);

        return ProductMapper.toResponseDTO(updated);
    }

    public void delete(String id) {
    Product product = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    repository.delete(product);
    }

    public List<ProductDTO> findByCategory(String category) {
        return repository.findByCategory(category)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
    }

    public PageResponseDTO<ProductResponseDTO> findAllPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = repository.findAll(pageable);

        Page<ProductResponseDTO> dtoPage =
                productPage.map(ProductMapper::toResponseDTO);

        return PageMapper.toDTO(dtoPage);
    }

}