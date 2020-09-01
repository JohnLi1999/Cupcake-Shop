package com.example.cupcakeshop.service;

import com.example.cupcakeshop.exception.ResourceNotFoundException;
import com.example.cupcakeshop.modal.Cake;
import com.example.cupcakeshop.modal.Category;
import com.example.cupcakeshop.modal.Tag;
import com.example.cupcakeshop.modal.enums.TagName;
import com.example.cupcakeshop.payload.request.CakeRequest;
import com.example.cupcakeshop.payload.response.ApiResponse;
import com.example.cupcakeshop.payload.response.CakeResponse;
import com.example.cupcakeshop.repository.CakeRepository;
import com.example.cupcakeshop.repository.CategoryRepository;
import com.example.cupcakeshop.repository.TagRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CakeService {

    @Value("${server.address}")
    private String serverAddress;

    @Value("${server.port}")
    private String serverPort;

    private final CakeRepository cakeRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public CakeService(CakeRepository cakeRepository, CategoryRepository categoryRepository, TagRepository tagRepository) {
        this.cakeRepository = cakeRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    public ApiResponse addCake(CakeRequest cakeRequest) {
        if (cakeRepository.existsByName(cakeRequest.getName())) {
            return new ApiResponse(false,"The cake already exists!");
        }

        Cake cake = new Cake(
                cakeRequest.getName(),
                cakeRequest.getDescription(),
                cakeRequest.getPrice(),
                cakeRequest.getStock(),
                cakeRequest.getCover(),
                cakeRequest.getImg1(),
                cakeRequest.getImg2()
        );

        cake.setCategory(obtainCategory(cakeRequest.getCategory()));
        cake.setTags(obtainTags(cakeRequest.getTags()));

        cakeRepository.save(cake);

        return new ApiResponse(true, "Cake created successfully!");
    }

    public List<CakeResponse> getAllCakes() {
        List<CakeResponse> cakeResponseList = new ArrayList<>();

        List<Cake> cakeList = cakeRepository.findAll();
        cakeList.forEach(cake -> {
            String cakeImagePath = "http://" + serverAddress + ":" + serverPort + "/uploads/cake_images/";

            String cover = cakeImagePath + cake.getCover();
            String img1 = cakeImagePath + cake.getImg1();
            String img2 = cakeImagePath + cake.getImg2();

            List<String> tags = cake
                    .getTags()
                    .stream()
                    .map(cakeTag -> cakeTag.getName().toString())
                    .collect(Collectors.toList());

            String createdAt = cake
                    .getCreatedAt()
                    .format(DateTimeFormatter
                            .ofPattern("yyyy-MM-dd HH:mm"));
            String updatedAt = cake
                    .getUpdatedAt()
                    .format(DateTimeFormatter
                            .ofPattern("yyyy-MM-dd HH:mm"));

            CakeResponse cakeResponse = new CakeResponse(
                    cake.getId(),
                    cake.getName(),
                    cake.getDescription(),
                    cake.getPrice(),
                    cake.getStock(),
                    cover,
                    img1,
                    img2,
                    createdAt,
                    updatedAt,
                    cake.getCategory().getName(),
                    tags
            );

            cakeResponseList.add(cakeResponse);
        });

        return cakeResponseList;
    }

    public ApiResponse updateCake(Long id, CakeRequest cakeRequest) {
        Cake cakeToUpdate = cakeRepository.getOne(id);

        if (!cakeToUpdate.getName().equals(cakeRequest.getName()) &&
            cakeRepository.existsByName(cakeRequest.getName())) {
            return new ApiResponse(false, "The cake name has been used!");
        }

        cakeToUpdate.setName(cakeRequest.getName());
        cakeToUpdate.setDescription(cakeRequest.getDescription());
        cakeToUpdate.setPrice(cakeRequest.getPrice());
        cakeToUpdate.setStock(cakeRequest.getStock());
        cakeToUpdate.setCover(cakeRequest.getCover());
        cakeToUpdate.setImg1(cakeRequest.getImg1());
        cakeToUpdate.setImg2(cakeRequest.getImg2());
        cakeToUpdate.setCategory(obtainCategory(cakeRequest.getCategory()));
        cakeToUpdate.setTags(obtainTags(cakeRequest.getTags()));

        cakeRepository.save(cakeToUpdate);

        return new ApiResponse(true, "Cake updated successfully!");
    }

    private Category obtainCategory(String inputCategory) {
        return categoryRepository
                .findByName(inputCategory)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category ", "name", inputCategory)
                );
    }

    private Set<Tag> obtainTags(List<String> inputTags) {
        Set<Tag> tags = new HashSet<>();

        if (inputTags != null) {
            inputTags.forEach(inputCakeTag -> {
                Tag tag = tagRepository
                        .findByName(TagName.valueOf(inputCakeTag))
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Cake Tag", "name", inputCakeTag)
                        );
                tags.add(tag);
            });
        }

        return tags;
    }
}
