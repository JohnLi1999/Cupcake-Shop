package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem>  findAllByOrderId(Long order_id);
}
