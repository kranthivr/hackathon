package com.honeywellhackathon.ticketbooking.aggregation;

import java.time.LocalDateTime;

public interface TicketSummary {

    String getSeats();

    LocalDateTime getShowAt();

    LocalDateTime getBookedAt();

}
