package com.example.cupcakeshop.service;

import com.example.cupcakeshop.modal.Category;
import com.example.cupcakeshop.payload.request.CategoryRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.CategoryResponse;
import com.example.cupcakeshop.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ApiResponse addCategory(CategoryRequest categoryRequest) {
        if (categoryRepository.existsByName(categoryRequest.getName())) {
            return new ApiResponse(false,"The category already exists!");
        }

        Category category = new Category(categoryRequest.getName());
        categoryRepository.save(category);

        return new ApiResponse(true,"The new category has been created!");
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository
                .findAll()
                .stream()
                .map(category -> {
                    String createdAt = category
                            .getCreatedAt()
                            .format(DateTimeFormatter
                                    .ofPattern("yyyy-MM-dd HH:mm:ss"));
                    String updatedAt = category
                            .getUpdatedAt()
                            .format(DateTimeFormatter
                                    .ofPattern("yyyy-MM-dd HH:mm:ss"));

                    return new CategoryResponse(
                            category.getId(),
                            category.getName(),
                            createdAt,
                            updatedAt
                    );
                })
                .collect(Collectors.toList());
    }
}
