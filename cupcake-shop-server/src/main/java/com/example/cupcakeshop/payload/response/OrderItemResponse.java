package com.example.cupcakeshop.payload.response;

import java.math.BigDecimal;

public class OrderItemResponse {

    private String cakeName;
    private String cakeCover;
    private BigDecimal price;
    private Integer amount;

    public OrderItemResponse(String cakeName, String cakeCover, BigDecimal price, Integer amount) {
        this.cakeName = cakeName;
        this.cakeCover = cakeCover;
        this.price = price;
        this.amount = amount;
    }

    public String getCakeName() {
        return cakeName;
    }

    public void setCakeName(String cakeName) {
        this.cakeName = cakeName;
    }

    public String getCakeCover() {
        return cakeCover;
    }

    public void setCakeCover(String cakeCover) {
        this.cakeCover = cakeCover;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
