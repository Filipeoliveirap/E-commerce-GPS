package com.backend.business.service;

import com.backend.business.DTO.ProductDTO;
import com.backend.business.mappers.ProductMapper;
import com.backend.infrastructure.model.Product;
import com.backend.infrastructure.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
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

    
    public ProductDTO create(ProductDTO dto) {
        Product product = ProductMapper.toEntity(dto);
        product.setId(null); 
        return ProductMapper.toDTO(repository.save(product));
    }

    
    public ProductDTO update(String id, ProductDTO dto) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setImage(dto.getImage());
        product.setRating(dto.getRating());
        product.setReviews(dto.getReviews());
        product.setDiscount(dto.getDiscount());
        product.setCategory(dto.getCategory());
        product.setInStock(dto.getInStock());

        return ProductMapper.toDTO(repository.save(product));
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

public List<ProductDTO> findAllPaged(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return repository.findAll(pageable)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
}

    public List<ProductDTO> seedProducts(List<ProductDTO> products) {
    return products.stream()
            .map((ProductDTO dto) -> {
                Product saved = repository.save(ProductMapper.toEntity(dto));
                return ProductMapper.toDTO(saved);
            })
            .collect(Collectors.toList());
}
}