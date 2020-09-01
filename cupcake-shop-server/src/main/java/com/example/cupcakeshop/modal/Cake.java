package com.example.cupcakeshop.modal;

import com.example.cupcakeshop.modal.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "cakes", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Cake extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotBlank
    @Lob
    private String description;

    @Digits(integer = 4, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cake_tags",
            joinColumns = @JoinColumn(name = "cake_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    public Cake() {
    }

    public Cake(@NotBlank @Size(max = 150) String name, @NotBlank String description, @NotBlank @Digits(integer = 4, fraction = 2) BigDecimal price, @NotBlank Integer stock, @NotBlank String cover, @NotBlank String img1, @NotBlank String img2) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.cover = cover;
        this.img1 = img1;
        this.img2 = img2;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
}
