package com.kirillbbb.depositcalculator.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CalculateRequest(
        @NotNull
        @DecimalMin(value = "1000", message = "Amount must be between 1000 and 10000000")
        @DecimalMax(value = "10000000", message = "Amount must be between 1000 and 10000000")
        BigDecimal amount,

        @NotNull
        @Min(value = 1, message = "Months must be between 1 and 60")
        @Max(value = 60, message = "Months must be between 1 and 60")
        Integer months,

        @NotNull
        @DecimalMin(value = "1", message = "Rate must be between 1 and 20")
        @DecimalMax(value = "20", message = "Rate must be between 1 and 20")
        BigDecimal rate
) {
}
