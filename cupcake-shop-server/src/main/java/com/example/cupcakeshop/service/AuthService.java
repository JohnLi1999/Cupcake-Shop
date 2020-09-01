package com.example.cupcakeshop.service;

import com.example.cupcakeshop.exception.ResourceNotFoundException;
import com.example.cupcakeshop.modal.Role;
import com.example.cupcakeshop.modal.enums.RoleName;
import com.example.cupcakeshop.modal.User;
import com.example.cupcakeshop.payload.request.SignUpRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.repository.RoleRepository;
import com.example.cupcakeshop.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiResponse signUp(SignUpRequest signUpRequest) {
        // First check if the username or email is already in use
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ApiResponse(false,"The username has been registered!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ApiResponse(false,"The email has benn registered!");
        }

        // Create a new user account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAddress()
        );

        /*  Set Roles if they are available in the request
            Otherwise, set Role to ROLE_USER as default  */
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository
                .findByName(RoleName.ROLE_USER)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Role", "name", RoleName.ROLE_USER)
                );
        roles.add(userRole);

        // Keep other roles if available (need to exclude USER_ROLE)
        List<String> signUpRoles = signUpRequest.getRoles();
        if (signUpRoles != null) {
            signUpRoles.stream()
                    .filter(role -> !role.equals(RoleName.ROLE_USER.toString()))
                    .forEach(signUpRole -> {
                        Role role = roleRepository
                                .findByName(RoleName.valueOf(signUpRole))
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                signUpRole,
                                                "name",
                                                RoleName.valueOf(signUpRole))
                                );
                        roles.add(role);
                    });
        }
        user.setRoles(roles);

        userRepository.save(user);

        return new ApiResponse(true, "User registered successfully!");
    }
}
