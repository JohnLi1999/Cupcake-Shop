package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Boolean existsByUserIdAndCakeId(Long user_id, Long cake_id);

    Boolean existsByUserId(Long user_id);

    Cart findByUserIdAndCakeId(Long user_id, Long cake_id);

    List<Cart> findAllByUserId(Long user_id);

    void deleteAllByUserId(Long user_id);
}
