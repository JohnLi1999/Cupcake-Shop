package com.example.cupcakeshop.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserPasswordUpdateRequest {

    @NotBlank
    private String password;

    @NotBlank
    @Size(min = 6, max = 100)
    private String newPassword;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
