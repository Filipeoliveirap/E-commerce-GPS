package com.backend.business.DTO.checkoutDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoletoData {

    private String payerName;
    private String companyName;
    private Double amount;
    private String description;
    private LocalDate dueDate;
    private String barcode;
    private String lineDigitavel;
}