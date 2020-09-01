package com.example.cupcakeshop.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserPasswordResetRequest {

    @NotBlank
    @Size(min = 6, max = 100)
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
