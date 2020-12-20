package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
public class MainController {

    @GetMapping("/")
    public ResponseEntity<?> healthCheck() {
        ApiResponse response = new ApiResponse(true, "Health Check Succeeded!");
        return ResponseEntity.ok(response);
    }
}
