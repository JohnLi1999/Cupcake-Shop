package com.example.cupcakeshop.payload.request;

import com.example.cupcakeshop.payload.CartPayload;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class OrderRequest {

    @NotBlank
    @Size(max = 40)
    private String receiver;

    @NotBlank
    @Size(max = 200)
    private String address;

    @Digits(integer = 9, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "500000000.0")
    private BigDecimal totalPrice;

    @Min(0)
    private Integer totalAmount;

    private String payType;

    private List<CartPayload> cart;

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public List<CartPayload> getCart() {
        return cart;
    }

    public void setCart(List<CartPayload> cart) {
        this.cart = cart;
    }
}
