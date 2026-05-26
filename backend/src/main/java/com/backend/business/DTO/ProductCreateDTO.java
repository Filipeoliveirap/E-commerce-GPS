package com.backend.business.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProductCreateDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;

    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    private Double price;

    private Double originalPrice;

    @NotBlank(message = "Imagem é obrigatória")
    private String image;

    @NotBlank(message = "Categoria é obrigatória")
    private String category;

    @NotNull
    private Boolean inStock;
}