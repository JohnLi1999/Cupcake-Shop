package com.example.cupcakeshop.payload.response;

import java.math.BigDecimal;
import java.util.List;

public class OrderResponse {

    private Long id;
    private String username;
    private String receiver;
    private String address;
    private BigDecimal totalPrice;
    private Integer totalAmount;
    private String payType;
    private String orderStatus;
    private String createdAt;
    private String updatedAt;
    private List<OrderItemResponse> orderItemList;

    public OrderResponse(Long id, String username, String receiver, String address, BigDecimal totalPrice, Integer totalAmount, String payType, String orderStatus, String createdAt, String updatedAt, List<OrderItemResponse> orderItemList) {
        this.id = id;
        this.username = username;
        this.receiver = receiver;
        this.address = address;
        this.totalPrice = totalPrice;
        this.totalAmount = totalAmount;
        this.payType = payType;
        this.orderStatus = orderStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderItemList = orderItemList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<OrderItemResponse> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItemResponse> orderItemList) {
        this.orderItemList = orderItemList;
    }
}
