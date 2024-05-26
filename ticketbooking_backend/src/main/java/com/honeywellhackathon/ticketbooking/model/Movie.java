package com.honeywellhackathon.ticketbooking.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
@Table(name = "movies")
public class Movie implements Serializable {
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

    @Transient
    private List<LocalDateTime> showTimes;

}
