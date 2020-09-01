package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.request.UserInfoUpdateRequest;
import com.example.cupcakeshop.payload.request.UserPasswordResetRequest;
import com.example.cupcakeshop.payload.request.UserPasswordUpdateRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.UserSummaryResponse;
import com.example.cupcakeshop.security.CurrentUser;
import com.example.cupcakeshop.security.CustomUserDetails;
import com.example.cupcakeshop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @RolesAllowed("ROLE_USER")
    public UserSummaryResponse getCurrentUser(@CurrentUser CustomUserDetails currentUser) {
        List<String> roles = currentUser
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new UserSummaryResponse(
                currentUser.getId(),
                currentUser.getUsername(),
                currentUser.getEmail(),
                currentUser.getAddress(),
                roles
        );
    }

    @PutMapping("/update_info/{id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> updateUserInfo(@PathVariable(value = "id") Long id,
                                            @Valid @RequestBody UserInfoUpdateRequest userInfoUpdateRequest) {
        System.out.println(userInfoUpdateRequest);

        ApiResponse response = userService.updateUserInfo(id, userInfoUpdateRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PutMapping("/update_password/{id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> updateUserPassword(@PathVariable(value = "id") Long id,
                                                @Valid @RequestBody UserPasswordUpdateRequest userPasswordUpdateRequest) {
        ApiResponse response = userService.updateUserPassword(id, userPasswordUpdateRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @PutMapping("/reset_password/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> resetUserPassword(@PathVariable(value = "id") Long id,
                                               @Valid @RequestBody UserPasswordResetRequest userPasswordResetRequest) {
        ApiResponse response = userService.resetUserPassword(id, userPasswordResetRequest);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @DeleteMapping("/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long id) {
        ApiResponse response = userService.deleteUser(id);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/all")
    @RolesAllowed("ROLE_ADMIN")
    public List<UserSummaryResponse> getAllUsers() {
        return userService.getAllUsers();
    }
}
