package com.example.cupcakeshop.controller;

import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.service.UploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        ApiResponse response = uploadService.upload(file);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
}
