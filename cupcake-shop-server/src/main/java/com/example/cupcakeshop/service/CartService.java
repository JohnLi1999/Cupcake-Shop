package com.example.cupcakeshop.service;

import com.example.cupcakeshop.modal.Cake;
import com.example.cupcakeshop.modal.Cart;
import com.example.cupcakeshop.modal.User;
import com.example.cupcakeshop.payload.CartPayload;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.repository.CakeRepository;
import com.example.cupcakeshop.repository.CartRepository;
import com.example.cupcakeshop.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CakeRepository cakeRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, CakeRepository cakeRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cakeRepository = cakeRepository;
    }

    public ApiResponse addCartItem(Long user_id, Long cake_id) {
        if (cartRepository.existsByUserIdAndCakeId(user_id, cake_id)) {
            Cart cartToUpdate = cartRepository.findByUserIdAndCakeId(user_id, cake_id);
            cartToUpdate.setAmount(cartToUpdate.getAmount() + 1);
            cartRepository.save(cartToUpdate);
            return new ApiResponse(true, "Cake added!");
        }

        User user = userRepository.getOne(user_id);
        Cake cake = cakeRepository.getOne(cake_id);
        Cart cart = new Cart(1);
        cart.setUser(user);
        cart.setCake(cake);

        cartRepository.save(cart);

        return new ApiResponse(true, "Cake added to your cart!");
    }

    public ApiResponse reduceCartItem(Long user_id, Long cake_id) {
        if (!cartRepository.existsByUserIdAndCakeId(user_id, cake_id)) {
            return new ApiResponse(false, "You do not have the cake in your cart");
        }

        Cart cartToUpdate = cartRepository.findByUserIdAndCakeId(user_id, cake_id);

        if (cartToUpdate.getAmount() == 1) {
            cartRepository.delete(cartToUpdate);
        } else {
            cartToUpdate.setAmount(cartToUpdate.getAmount() - 1);
            cartRepository.save(cartToUpdate);
        }

        return new ApiResponse(true, "Cake reduced!");
    }

    public ApiResponse deleteCartItem(Long user_id, Long cake_id) {
        if (!cartRepository.existsByUserIdAndCakeId(user_id, cake_id)) {
            return new ApiResponse(false, "You do not have the cake in your cart");
        }

        Cart cartToRemove = cartRepository.findByUserIdAndCakeId(user_id, cake_id);
        cartRepository.delete(cartToRemove);

        return new ApiResponse(true, "Cake successfully removed from your cart");
    }

    @Transactional
    public List<CartPayload> updateAndGetCart(Long user_id, List<CartPayload> cartPayloadList) {
        cartPayloadList.forEach(cartPayload -> {
            Long cake_id = cartPayload.getCakeId();
            Integer amount = cartPayload.getAmount();

            if (cartRepository.existsByUserIdAndCakeId(user_id, cake_id)) {
                Cart cartToUpdate = cartRepository.findByUserIdAndCakeId(user_id, cake_id);
                cartToUpdate.setAmount(cartToUpdate.getAmount() + amount);
                cartRepository.save(cartToUpdate);
            } else {
                User user = userRepository.getOne(user_id);
                Cake cake = cakeRepository.getOne(cake_id);
                Cart cart = new Cart(amount);
                cart.setUser(user);
                cart.setCake(cake);
                cartRepository.save(cart);
            }
        });

        return getAllCartItemsByUserId(user_id);
    }

    private List<CartPayload> getAllCartItemsByUserId(Long user_id) {
        List<Cart> cartItemList = cartRepository.findAllByUserId(user_id);

        return cartItemList.stream().map(cartItem ->
                new CartPayload(
                        cartItem.getAmount(),
                        cartItem.getCake().getId()
                )
        ).collect(Collectors.toList());
    }

    @Transactional
    public ApiResponse deleteAllCartItems(Long user_id) {
        if (!cartRepository.existsByUserId(user_id)) {
            return new ApiResponse(false, "You do not have any items in your cart yet!");
        }

        cartRepository.deleteAllByUserId(user_id);

        return new ApiResponse(true, "Your cart is cleared!");
    }
}
