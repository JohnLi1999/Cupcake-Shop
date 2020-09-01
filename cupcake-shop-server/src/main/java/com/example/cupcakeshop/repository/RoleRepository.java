package com.example.cupcakeshop.repository;

import com.example.cupcakeshop.modal.Role;
import com.example.cupcakeshop.modal.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName name);
}
