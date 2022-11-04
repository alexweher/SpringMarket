package ru.geekbrains.spring.winter.market.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppError {
    private int code;
    private String message;
}
