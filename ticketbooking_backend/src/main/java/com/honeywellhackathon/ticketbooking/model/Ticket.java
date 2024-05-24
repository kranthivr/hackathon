package com.honeywellhackathon.ticketbooking.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tickets")
@EntityListeners(EntityListener.class)
public class Ticket {

    @Id
    private Long id;

    @Column(name = "seat_name")
    private String seatName;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(name = "show_at", nullable = false, updatable = false)
    private LocalDateTime showAt;

    @Column(name = "is_booked", nullable = false, columnDefinition = "boolean default false")
    private boolean isBooked;

    @Column(name = "booked_at", nullable = true, updatable = true)
    private LocalDateTime bookedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
