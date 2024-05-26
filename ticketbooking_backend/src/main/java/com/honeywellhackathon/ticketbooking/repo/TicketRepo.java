package com.honeywellhackathon.ticketbooking.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.honeywellhackathon.ticketbooking.model.Movie;
import com.honeywellhackathon.ticketbooking.model.Ticket;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long> {

    @Query(value = "select t.showAt as showTime from Ticket as t where t.movie = :movie group by t.showAt")
    List<LocalDateTime> findShowsByMovie(@Param("movie") Movie movie);

    List<Ticket> findByMovieAndShowAt(Movie movie, LocalDateTime showAt);

}
