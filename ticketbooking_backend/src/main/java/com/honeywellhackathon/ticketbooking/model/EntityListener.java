package com.honeywellhackathon.ticketbooking.model;

import java.time.LocalDateTime;

import jakarta.persistence.PreUpdate;

public class EntityListener {
    @PreUpdate
    public void preUpdate(Ticket ticket) {
        ticket.setBookedAt(LocalDateTime.now());
    }
}
