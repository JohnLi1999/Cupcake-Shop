package com.example.cupcakeshop.payload.request;

import javax.persistence.Lob;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class CakeRequest {

    @NotBlank
    @Size(min = 3, max = 150)
    private String name;

    @NotBlank
    @Lob
    private String description;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "1.0", inclusive = false)
    @DecimalMax(value = "500.0")
    private BigDecimal price;

    @Min(0)
    @Max(10000)
    private Integer stock;

    @NotBlank
    private String cover;

    @NotBlank
    private String img1;

    @NotBlank
    private String img2;

    @NotBlank
    private String category;

    private List<String> tags;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getImg1() {
        return img1;
    }

    public void setImg1(String img1) {
        this.img1 = img1;
    }

    public String getImg2() {
        return img2;
    }

    public void setImg2(String img2) {
        this.img2 = img2;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
