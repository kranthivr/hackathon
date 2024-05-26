package com.honeywellhackathon.ticketbooking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.honeywellhackathon.ticketbooking.model.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long> {
    // List<Movie> findByIdGroupByShowAt(Long movieId);
}
