package com.kirillbbb.depositcalculator.dto;

import java.math.BigDecimal;

public record CalculateResponse(
        BigDecimal total,
        BigDecimal profit
) {
}
