package com.honeywellhackathon.ticketbooking.dto;

import java.util.List;

import lombok.Data;

@Data
public class PayDto {

    private String user;
    private List<Long> ticketIds;

}
