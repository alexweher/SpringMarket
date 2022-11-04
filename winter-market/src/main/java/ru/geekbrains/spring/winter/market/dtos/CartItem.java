package ru.geekbrains.spring.winter.market.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    private  String productTitle;
    private Long productId;
    private int quantity;
    private int pricePerProduct;
    private int price;
}
