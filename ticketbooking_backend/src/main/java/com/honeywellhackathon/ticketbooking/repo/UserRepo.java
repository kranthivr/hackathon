package com.honeywellhackathon.ticketbooking.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.honeywellhackathon.ticketbooking.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
