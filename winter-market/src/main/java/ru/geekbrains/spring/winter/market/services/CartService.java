package ru.geekbrains.spring.winter.market.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.geekbrains.spring.winter.market.dtos.Cart;
import ru.geekbrains.spring.winter.market.entities.Product;
import ru.geekbrains.spring.winter.market.exceptions.ResourceNotFoundException;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ProductService productService;
    private Cart tempCart;

    @PostConstruct
    public void init() {
        tempCart = new Cart();


    }

    public Cart getCurrentCart()
    {
        return tempCart;
    }

    public void add(Long productId) {
        Product product  = productService.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Продукт с id: " + productId + " не найден"));
        tempCart.add(product);
    }
}
