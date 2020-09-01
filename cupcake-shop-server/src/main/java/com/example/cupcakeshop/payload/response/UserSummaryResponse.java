package com.example.cupcakeshop.payload.response;

import java.util.List;

public class UserSummaryResponse {

    private Long id;
    private String username;
    private String email;
    private String address;
    private List<String> roles;

    public UserSummaryResponse(Long id, String username, String email, String address, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.address = address;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
