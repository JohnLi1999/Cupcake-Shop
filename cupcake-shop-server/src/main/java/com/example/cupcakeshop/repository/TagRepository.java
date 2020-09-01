package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.Tag;
import com.example.cupcakeshop.modal.enums.TagName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(TagName name);
}
