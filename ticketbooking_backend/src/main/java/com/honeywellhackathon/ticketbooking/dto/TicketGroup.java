package com.honeywellhackathon.ticketbooking.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TicketGroup {

    private Long movieId;
    private LocalDateTime showAt;

}
