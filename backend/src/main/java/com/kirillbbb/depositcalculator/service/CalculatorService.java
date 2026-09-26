package com.kirillbbb.depositcalculator.service;

import com.kirillbbb.depositcalculator.dto.CalculateRequest;
import com.kirillbbb.depositcalculator.dto.CalculateResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@Service
public class CalculatorService {

    private static final BigDecimal PERCENT_DIVISOR = BigDecimal.valueOf(1200);
    private static final int MONEY_SCALE = 2;
    private static final MathContext CALCULATION_CONTEXT = new MathContext(20, RoundingMode.HALF_UP);

    public CalculateResponse calculate(CalculateRequest request) {
        BigDecimal monthlyRate = request.rate()
                .divide(PERCENT_DIVISOR, CALCULATION_CONTEXT);

        BigDecimal total = request.amount()
                .multiply(
                        BigDecimal.ONE.add(monthlyRate)
                                .pow(request.months(), CALCULATION_CONTEXT),
                        CALCULATION_CONTEXT
                )
                .setScale(MONEY_SCALE, RoundingMode.HALF_UP);

        BigDecimal profit = total
                .subtract(request.amount())
                .setScale(MONEY_SCALE, RoundingMode.HALF_UP);

        return new CalculateResponse(total, profit);
    }
}
