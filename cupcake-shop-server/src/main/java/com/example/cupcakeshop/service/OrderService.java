package com.example.cupcakeshop.service;

import com.example.cupcakeshop.modal.Cake;
import com.example.cupcakeshop.modal.Order;
import com.example.cupcakeshop.modal.OrderItem;
import com.example.cupcakeshop.modal.User;
import com.example.cupcakeshop.modal.enums.OrderStatus;
import com.example.cupcakeshop.modal.enums.PayType;
import com.example.cupcakeshop.payload.CartPayload;
import com.example.cupcakeshop.payload.request.OrderRequest;
import com.example.cupcakeshop.payload.request.OrderStatusRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.OrderItemResponse;
import com.example.cupcakeshop.payload.response.OrderResponse;
import com.example.cupcakeshop.repository.CakeRepository;
import com.example.cupcakeshop.repository.OrderItemRepository;
import com.example.cupcakeshop.repository.OrderRepository;
import com.example.cupcakeshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Value("${server.address}")
    private String serverAddress;

    @Value("${server.port}")
    private String serverPort;

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CakeRepository cakeRepository;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, UserRepository userRepository, CakeRepository cakeRepository, CartService cartService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.cakeRepository = cakeRepository;
        this.cartService = cartService;
    }

    @Transactional
    public ApiResponse addOrder(Long user_id, OrderRequest orderRequest) {
        if (!userRepository.existsById(user_id)) {
            return new ApiResponse(false, "Error: User does not exist!");
        }

        Order order = new Order(
                orderRequest.getReceiver(),
                orderRequest.getAddress(),
                orderRequest.getTotalPrice(),
                orderRequest.getTotalAmount(),
                PayType.valueOf(orderRequest.getPayType()),
                OrderStatus.PLACED
        );
        User user = userRepository.getOne(user_id);
        order.setUser(user);
        orderRepository.save(order);

        ApiResponse response = addOrderItems(order.getId(), orderRequest.getCart());
        if (!response.getSuccess()) {
            return response;
        }

        cartService.deleteAllCartItems(user_id);

        return new ApiResponse(true, "Your order has been successfully submitted!");
    }

    @Transactional
    public ApiResponse addOrderItems(Long order_id, List<CartPayload> cart) {
        for (CartPayload cartItem : cart) {
            if (!cakeRepository.existsById(cartItem.getCakeId())) {
                return new ApiResponse(false, "Error: Cake does not exist");
            }

            Cake cake = cakeRepository.getOne(cartItem.getCakeId());
            Order order = orderRepository.getOne(order_id);

            OrderItem orderItem = new OrderItem(cake.getPrice(), cartItem.getAmount());
            orderItem.setCake(cake);
            orderItem.setOrder(order);

            orderItemRepository.save(orderItem);
        }

        return new ApiResponse(true, "All order items inserted!");
    }

    @Transactional
    public ApiResponse updateOrderStatus(Long order_id, OrderStatusRequest orderStatusRequest) {
        if (!orderRepository.existsById(order_id)) {
            return new ApiResponse(false, "Order does not exist!");
        }

        Order orderToUpdate = orderRepository.getOne(order_id);
        orderToUpdate.setOrderStatus(OrderStatus.valueOf(orderStatusRequest.getNewStatus()));
        orderRepository.save(orderToUpdate);

        return new ApiResponse(true, "Order status updated!");
    }

    public List<OrderResponse> getOrders(Long user_id) {
        if (!userRepository.existsById(user_id)) {
            return new ArrayList<>();
        }

        List<Order> userOrderList = orderRepository.findAllByUserId(user_id);
        return obtainOrderResponseList(userOrderList);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orderList = orderRepository.findAll();
        return obtainOrderResponseList(orderList);
    }

    private List<OrderResponse> obtainOrderResponseList(List<Order> orderList) {
        return orderList.stream().map(order -> {
            List<OrderItemResponse> orderItemResponseList = orderItemRepository
                    .findAllByOrderId(order.getId())
                    .stream().map(orderItem -> new OrderItemResponse(
                            orderItem.getCake().getName(),
                            "http://" + serverAddress + ":" + serverPort + "/uploads/cake_images/" + orderItem.getCake().getCover(),
                            orderItem.getPrice(),
                            orderItem.getAmount()
                    )).collect(Collectors.toList());

            return new OrderResponse(
                    order.getId(),
                    order.getUser().getUsername(),
                    order.getReceiver(),
                    order.getAddress(),
                    order.getTotalPrice(),
                    order.getTotalAmount(),
                    order.getPayType().toString(),
                    order.getOrderStatus().toString(),
                    order.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                    order.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                    orderItemResponseList
            );
        }).collect(Collectors.toList());
    }
}
