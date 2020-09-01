package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.request.OrderRequest;
import com.example.cupcakeshop.payload.request.OrderStatusRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.OrderResponse;
import com.example.cupcakeshop.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{user_id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> addOrder(@PathVariable(value = "user_id") Long user_id,
                                      @RequestBody OrderRequest orderRequest) {
        ApiResponse response = orderService.addOrder(user_id, orderRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/{user_id}")
    @RolesAllowed("ROLE_USER")
    public List<OrderResponse> getOrders(@PathVariable(value = "user_id") Long user_id) {
        return orderService.getOrders(user_id);
    }

    @GetMapping("/all")
    @RolesAllowed("ROLE_ADMIN")
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/{order_id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> updateOrderStatus(@PathVariable(value = "order_id") Long order_id,
                                               @RequestBody OrderStatusRequest orderStatusRequest) {
        ApiResponse response =  orderService.updateOrderStatus(order_id, orderStatusRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
}
