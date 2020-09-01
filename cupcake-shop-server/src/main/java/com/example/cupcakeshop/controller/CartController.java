package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.CartPayload;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/one/{user_id}/{cake_id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> addCartItem(@PathVariable(value = "user_id") Long user_id,
                                         @PathVariable(value = "cake_id") Long cake_id) {
        ApiResponse response = cartService.addCartItem(user_id, cake_id);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PutMapping("/one/{user_id}/{cake_id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> reduceCartItem(@PathVariable(value = "user_id") Long user_id,
                                            @PathVariable(value = "cake_id") Long cake_id) {
        ApiResponse response = cartService.reduceCartItem(user_id, cake_id);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @DeleteMapping("/one/{user_id}/{cake_id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> deleteCartItem(@PathVariable(value = "user_id") Long user_id,
                                            @PathVariable(value = "cake_id") Long cake_id) {
        ApiResponse response = cartService.deleteCartItem(user_id, cake_id);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PutMapping("/all/{user_id}")
    public List<CartPayload> updateAndGetCart(@PathVariable(value = "user_id") Long user_id,
                                              @RequestBody List<CartPayload> cartPayloadList) {
        return cartService.updateAndGetCart(user_id, cartPayloadList);
    }

    @DeleteMapping("/all/{user_id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> deleteAllCartItems(@PathVariable(value = "user_id") Long user_id) {
        ApiResponse response = cartService.deleteAllCartItems(user_id);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
}
