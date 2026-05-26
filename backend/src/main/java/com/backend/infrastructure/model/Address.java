package com.backend.infrastructure.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String street;
    private String number;
    private String complement;
    private String neighborhood;
    private String city;
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    public String getFullAddress() {
        return street + ", " + number + " - " + city + "/" + state + " - CEP: " + zipCode;
    }
}