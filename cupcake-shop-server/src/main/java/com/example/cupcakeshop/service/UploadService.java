package com.example.cupcakeshop.service;

import com.example.cupcakeshop.payload.response.ApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class UploadService {

    public ApiResponse upload(MultipartFile file) {
        // Get file name
        String fileName = file.getOriginalFilename();

        // Obtain upload path
        String path = System.getProperty("user.dir") + "/src/main/uploads/cake_images/";
        File destPath = new File(path + fileName);

        // If the path does not exist, we need to create one
        if (!destPath.getParentFile().exists()) {
            boolean pathCreated = destPath.getParentFile().mkdir();

            if (!pathCreated) {
                return new ApiResponse(false, "File System Error!");
            }
        }

        // Save file
        try {
            file.transferTo(destPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ApiResponse(true, "Image Successfully uploaded!");
    }
}
