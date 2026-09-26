package com.kirillbbb.depositcalculator.controller;

import com.kirillbbb.depositcalculator.dto.CalculateRequest;
import com.kirillbbb.depositcalculator.dto.CalculateResponse;
import com.kirillbbb.depositcalculator.service.CalculatorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CalculatorController {

    private final CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    public CalculateResponse calculate(@Valid @RequestBody CalculateRequest request) {
        return calculatorService.calculate(request);
    }
}
