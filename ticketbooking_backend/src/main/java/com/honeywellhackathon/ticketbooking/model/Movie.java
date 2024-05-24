package com.honeywellhackathon.ticketbooking.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    private Long id;

    @Column
    private String name;

    @Column(name = "img_data")
    private String imgData;

    @Column
    private String description;

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    private List<Ticket> tickets;

}
