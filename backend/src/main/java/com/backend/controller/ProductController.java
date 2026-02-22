package com.backend.controller;

import com.backend.business.DTO.*;
import com.backend.business.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;

    
    @GetMapping
    public List<ProductDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProductDTO findById(@PathVariable String id) {
    return service.findById(id);
}


    @PostMapping
    public ProductResponseDTO create(@Valid @RequestBody ProductCreateDTO dto) {
        return service.create(dto);
    }


    @PutMapping("/{id}")
    public ProductResponseDTO update(
            @PathVariable String id,
            @Valid @RequestBody ProductUpdateDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
    service.delete(id);
}

    @GetMapping("/category/{category}")
    public List<ProductDTO> findByCategory(@PathVariable String category) {
    return service.findByCategory(category);
}

    @GetMapping("/paged")
    public PageResponseDTO<ProductResponseDTO> findAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.findAllPaged(page, size);
    }
}