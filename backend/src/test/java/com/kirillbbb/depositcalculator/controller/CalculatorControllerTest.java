package com.kirillbbb.depositcalculator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirillbbb.depositcalculator.dto.CalculateRequest;
import com.kirillbbb.depositcalculator.service.CalculatorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CalculatorController.class)
class CalculatorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CalculatorService calculatorService;

    @Test
    void shouldCalculateValidRequest() throws Exception {
        when(calculatorService.calculate(any(CalculateRequest.class)))
                .thenReturn(new com.kirillbbb.depositcalculator.dto.CalculateResponse(
                        new BigDecimal("108299.95"),
                        new BigDecimal("8299.95")
                ));

        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new CalculateRequest(
                                        new BigDecimal("100000"),
                                        12,
                                        new BigDecimal("8")
                                )
                        )))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(108299.95))
                .andExpect(jsonPath("$.profit").value(8299.95));
    }

    @Test
    void shouldRejectMalformedJson() throws Exception {
        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "amount": "invalid",
                                  "months": 12,
                                  "rate": 8
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Request contains a value with an invalid format"));
    }

    @Test
    void shouldRejectInvalidRequest() throws Exception {
        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "amount": 999,
                                  "months": 61,
                                  "rate": 21
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors.amount").exists())
                .andExpect(jsonPath("$.errors.months").exists())
                .andExpect(jsonPath("$.errors.rate").exists());
    }
}
