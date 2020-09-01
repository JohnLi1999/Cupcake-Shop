package com.example.cupcakeshop.payload;

import javax.validation.constraints.Min;

public class CartPayload {

    @Min(0)
    private Integer amount;

    private Long cakeId;

    public CartPayload() {
    }

    public CartPayload(Integer amount, Long cakeId) {
        this.amount = amount;
        this.cakeId = cakeId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Long getCakeId() {
        return cakeId;
    }

    public void setCakeId(Long cakeId) {
        this.cakeId = cakeId;
    }
}
