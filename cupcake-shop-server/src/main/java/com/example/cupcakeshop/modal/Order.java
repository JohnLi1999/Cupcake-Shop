package com.example.cupcakeshop.modal;

import com.example.cupcakeshop.modal.audit.UserDateAudit;
import com.example.cupcakeshop.modal.enums.OrderStatus;
import com.example.cupcakeshop.modal.enums.PayType;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private PayType payType;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private OrderStatus orderStatus;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<OrderItem> orderItems;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Order() {
    }

    public Order(@NotBlank @Size(max = 40) String receiver, @NotBlank @Size(max = 200) String address, @Digits(integer = 9, fraction = 2) @DecimalMin(value = "0.0", inclusive = false) @DecimalMax(value = "500000000.0") BigDecimal totalPrice, @Min(0) Integer totalAmount, PayType payType, OrderStatus orderStatus) {
        this.receiver = receiver;
        this.address = address;
        this.totalPrice = totalPrice;
        this.totalAmount = totalAmount;
        this.payType = payType;
        this.orderStatus = orderStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public PayType getPayType() {
        return payType;
    }

    public void setPayType(PayType payType) {
        this.payType = payType;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
