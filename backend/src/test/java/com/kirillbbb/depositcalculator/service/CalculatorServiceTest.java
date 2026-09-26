package com.kirillbbb.depositcalculator.service;

import com.kirillbbb.depositcalculator.dto.CalculateRequest;
import com.kirillbbb.depositcalculator.dto.CalculateResponse;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorServiceTest {

    private final CalculatorService service = new CalculatorService();

    @Test
    void shouldCalculateDeposit() {
        CalculateResponse result = service.calculate(
                new CalculateRequest(
                        new BigDecimal("100000"),
                        12,
                        new BigDecimal("8")
                )
        );

        assertEquals(new BigDecimal("108299.95"), result.total());
        assertEquals(new BigDecimal("8299.95"), result.profit());
    }

    @Test
    void shouldCalculateMaximumInput() {
        CalculateResponse result = service.calculate(
                new CalculateRequest(
                        new BigDecimal("10000000"),
                        60,
                        new BigDecimal("20")
                )
        );

        assertEquals(new BigDecimal("26959701.39"), result.total());
        assertEquals(new BigDecimal("16959701.39"), result.profit());
    }

    @Test
    void profitShouldEqualTotalMinusAmount() {
        CalculateRequest request = new CalculateRequest(
                new BigDecimal("50000"),
                24,
                new BigDecimal("10")
        );

        CalculateResponse result = service.calculate(request);

        assertEquals(
                result.total().subtract(request.amount()),
                result.profit()
        );
    }
}
