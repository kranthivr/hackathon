package com.honeywellhackathon.ticketbooking.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.honeywellhackathon.ticketbooking.model.Movie;

public interface MoviesRepo extends JpaRepository<Movie, Long> {

}
