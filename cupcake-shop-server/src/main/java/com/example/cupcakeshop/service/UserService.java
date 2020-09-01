package com.example.cupcakeshop.service;

import com.example.cupcakeshop.modal.User;
import com.example.cupcakeshop.payload.request.UserInfoUpdateRequest;
import com.example.cupcakeshop.payload.request.UserPasswordResetRequest;
import com.example.cupcakeshop.payload.request.UserPasswordUpdateRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.UserSummaryResponse;
import com.example.cupcakeshop.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiResponse updateUserInfo(Long id, UserInfoUpdateRequest userInfoUpdateRequest) {
        User userToUpdate = userRepository.getOne(id);

        // First check if the username or email is already in use
        if (!userToUpdate.getUsername().equals(userInfoUpdateRequest.getUsername()) &&
            userRepository.existsByUsername(userInfoUpdateRequest.getUsername())) {
            return new ApiResponse(false,"The username has been registered!");
        }

        if (!userToUpdate.getEmail().equals(userInfoUpdateRequest.getEmail()) &&
            userRepository.existsByEmail(userInfoUpdateRequest.getEmail())) {
            return new ApiResponse(false,"The email has benn registered!");
        }

        userToUpdate.setUsername(userInfoUpdateRequest.getUsername());
        userToUpdate.setEmail(userInfoUpdateRequest.getEmail());
        userToUpdate.setAddress(userInfoUpdateRequest.getAddress());
        userRepository.save(userToUpdate);

        return new ApiResponse(true, "Profile has been successfully updated!");
    }

    public ApiResponse updateUserPassword(Long id, UserPasswordUpdateRequest userPasswordUpdateRequest) {
        User userToUpdate = userRepository.getOne(id);

        if (!passwordEncoder.matches(userPasswordUpdateRequest.getPassword(), userToUpdate.getPassword())) {
            return new ApiResponse(false, "Your old password is not correct. Please try again!");
        }

        userToUpdate.setPassword(passwordEncoder.encode(userPasswordUpdateRequest.getNewPassword()));
        userRepository.save(userToUpdate);

        return new ApiResponse(true, "Password has been successfully updated!");
    }

    public ApiResponse resetUserPassword(Long id, UserPasswordResetRequest userPasswordResetRequest) {
        User userToUpdate = userRepository.getOne(id);

        userToUpdate.setPassword(passwordEncoder.encode(userPasswordResetRequest.getNewPassword()));
        userRepository.save(userToUpdate);

        return new ApiResponse(true, "Password has been successfully reset!");
    }

    public ApiResponse deleteUser(Long id) {
        userRepository.deleteById(id);
        return new ApiResponse(true, "The User has been successfully deleted!");
    }

    public List<UserSummaryResponse> getAllUsers() {
        List<UserSummaryResponse> userSummaryResponseList = new ArrayList<>();

        List<User> userList = userRepository.findAll();

        userList.forEach(user -> {
            List<String> roles = user
                    .getRoles()
                    .stream()
                    .map(role -> role.getName().toString())
                    .collect(Collectors.toList());

            UserSummaryResponse returnedUser = new UserSummaryResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getAddress(),
                    roles
            );

            userSummaryResponseList.add(returnedUser);
        });

        return userSummaryResponseList;
    }
}
