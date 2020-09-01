package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.request.CakeRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.CakeResponse;
import com.example.cupcakeshop.service.CakeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cakes")
public class CakeController {

    private final CakeService cakeService;

    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @PostMapping("/one")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> addCake(@Valid @RequestBody CakeRequest cakeRequest) {
        ApiResponse response = cakeService.addCake(cakeRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/all")
    public List<CakeResponse> getAllCakes() {
        return cakeService.getAllCakes();
    }

    @PutMapping("/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> updateCake(@PathVariable(value = "id") Long id,
                                        @Valid @RequestBody CakeRequest cakeRequest) {
        ApiResponse response = cakeService.updateCake(id, cakeRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

}
