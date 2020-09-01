package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.Cake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CakeRepository extends JpaRepository<Cake, Long> {

    Boolean existsByName(String name);
}
