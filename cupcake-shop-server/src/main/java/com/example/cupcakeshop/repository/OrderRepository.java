package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.Order;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUserId(Long user_id);

    List<Order> findAll();
}
