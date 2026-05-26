package com.backend.business.mappers;

import com.backend.business.DTO.PageResponseDTO;
import org.springframework.data.domain.Page;

public class PageMapper {

    public static <T> PageResponseDTO<T> toDTO(Page<T> page) {
        return PageResponseDTO.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}