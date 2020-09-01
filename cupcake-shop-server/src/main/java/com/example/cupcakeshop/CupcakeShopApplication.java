package com.example.cupcakeshop;

import com.example.cupcakeshop.controller.AuthController;
import com.example.cupcakeshop.controller.CakeController;
import com.example.cupcakeshop.controller.CategoryController;
import com.example.cupcakeshop.modal.Category;
import com.example.cupcakeshop.modal.enums.RoleName;
import com.example.cupcakeshop.modal.enums.TagName;
import com.example.cupcakeshop.payload.request.CakeRequest;
import com.example.cupcakeshop.payload.request.CategoryRequest;
import com.example.cupcakeshop.payload.request.SignUpRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
        CupcakeShopApplication.class,
        Jsr310JpaConverters.class
})
public class CupcakeShopApplication {

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    public static void main(String[] args) {
        SpringApplication.run(CupcakeShopApplication.class, args);
    }
}
