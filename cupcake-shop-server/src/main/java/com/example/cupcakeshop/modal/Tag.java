package com.example.cupcakeshop.modal;


import com.example.cupcakeshop.modal.enums.TagName;

import javax.persistence.*;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private TagName name;

    public Tag() {}

    public Tag(TagName name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TagName getName() {
        return name;
    }

    public void setName(TagName name) {
        this.name = name;
    }
}
