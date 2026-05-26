package com.backend.infrastructure.config;

import com.backend.infrastructure.model.Product;
import com.backend.infrastructure.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductDataInitializer {

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() > 0) {
                return;
            }

            List<Product> products = List.of(
                    Product.builder()
                            .name("Tênis Runner Pro")
                            .description("Tênis leve para corrida e treino diário")
                            .price(299.90)
                            .originalPrice(349.90)
                            .image("https://images.unsplash.com/photo-1542291026-7eec264c27ff")
                            .category("Esportes")
                            .inStock(true)
                            .build(),
                    Product.builder()
                            .name("Smartwatch Fit X")
                            .description("Relógio inteligente com monitoramento de saúde")
                            .price(499.90)
                            .originalPrice(599.90)
                            .image("https://images.unsplash.com/photo-1523275335684-37898b6baf30")
                            .category("Eletrônicos")
                            .inStock(true)
                            .build(),
                    Product.builder()
                            .name("Mochila Urban 25L")
                            .description("Mochila resistente para trabalho, estudo e viagens curtas")
                            .price(189.90)
                            .originalPrice(229.90)
                            .image("https://images.unsplash.com/photo-1553062407-98eeb64c6a62")
                            .category("Acessórios")
                            .inStock(true)
                            .build(),
                    Product.builder()
                            .name("Fone Bluetooth Wave")
                            .description("Fone sem fio com cancelamento de ruído")
                            .price(259.90)
                            .originalPrice(299.90)
                            .image("https://images.unsplash.com/photo-1505740420928-5e560c06d30e")
                            .category("Eletrônicos")
                            .inStock(true)
                            .build(),
                    Product.builder()
                            .name("Camiseta Dry Tech")
                            .description("Camiseta esportiva com secagem rápida")
                            .price(79.90)
                            .originalPrice(99.90)
                            .image("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab")
                            .category("Roupas")
                            .inStock(true)
                            .build()
            );

            productRepository.saveAll(products);
        };
    }
}
