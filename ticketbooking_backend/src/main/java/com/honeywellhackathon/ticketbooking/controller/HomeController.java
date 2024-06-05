package com.honeywellhackathon.ticketbooking.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.honeywellhackathon.ticketbooking.aggregation.TicketSummary;
import com.honeywellhackathon.ticketbooking.dto.LoginDto;
import com.honeywellhackathon.ticketbooking.dto.PayDto;
import com.honeywellhackathon.ticketbooking.model.Movie;
import com.honeywellhackathon.ticketbooking.model.Ticket;
import com.honeywellhackathon.ticketbooking.model.User;
import com.honeywellhackathon.ticketbooking.repo.MovieRepo;
import com.honeywellhackathon.ticketbooking.repo.TicketRepo;
import com.honeywellhackathon.ticketbooking.repo.UserRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class HomeController {

    private UserRepo userRepo;
    private MovieRepo moviesRepo;
    private TicketRepo ticketRepo;

    public HomeController(UserRepo userRepo, MovieRepo moviesRepo, TicketRepo ticketRepo) {
        this.userRepo = userRepo;
        this.moviesRepo = moviesRepo;
        this.ticketRepo = ticketRepo;
    }

    @GetMapping("/test")
    public String getMethodName() {
        return "Hello World";
    }

    @PostMapping("/login")
    public String postMethodName(@RequestBody LoginDto loginDto) {
        Optional<User> optionalUser = userRepo.findByUsername(loginDto.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getPassword().equals(loginDto.getPassword())) {
                return "success";
            } else {
                return "Invalid credentials";
            }
        }
        return "No User found";
    }

    @GetMapping("/movies")
    public List<Movie> fetchAllMovies() {
        return moviesRepo.findAll();
    }

    @GetMapping("/movies/{id}")
    public Movie fetchMovieDetails(@PathVariable Long id) {
        Optional<Movie> optionalMovie = moviesRepo.findById(id);
        if (optionalMovie.isPresent()) {
            Movie movie = optionalMovie.get();
            List<LocalDateTime> shows = ticketRepo.findShowsByMovie(movie);
            movie.setShowTimes(shows);
            return movie;
        }
        return null;
    }

    @GetMapping("/movies/{movieId}/shows/{showTime}")
    public List<Ticket> fetchMovieDetails(@PathVariable Long movieId, @PathVariable String showTime) {
        Optional<Movie> optionalMovie = moviesRepo.findById(movieId);
        if (optionalMovie.isPresent()) {
            Movie movie = optionalMovie.get();
            LocalDateTime showAt = LocalDateTime.parse(showTime);
            List<Ticket> tickets = ticketRepo.findByMovieAndShowAt(movie, showAt);
            return tickets;
        }
        return null;
    }

    @PostMapping("/pay")
    public String pay(@RequestBody PayDto payDto) {
        Optional<User> optionalUser = userRepo.findByUsername(payDto.getUser());
        if (!optionalUser.isPresent()) {
            return "Invalid User";
        }

        User user = optionalUser.get();
        List<Ticket> tickets = ticketRepo.findAllById(payDto.getTicketIds());
        boolean isAnyTicketBooked = tickets.stream().anyMatch(ticket -> ticket.isBooked());
        if (isAnyTicketBooked)
            return "Ticket(s) is/are already booked";

        UUID uuid = UUID.randomUUID();
        tickets.forEach(ticket -> {
            ticket.setBooked(true);
            ticket.setUser(user);
            ticket.setPaymentRef(uuid);
        });
        ticketRepo.saveAllAndFlush(tickets);
        return "Payment Successful";
    }

    @GetMapping("/bookedTickets")
    public List<TicketSummary> getBookedTickets(@RequestParam String username) {
        Optional<User> optionalUser = userRepo.findByUsername(username);
        if (!optionalUser.isPresent()) {
            return null;
        }

        User user = optionalUser.get();
        List<TicketSummary> bookedTickets = ticketRepo.findTicketSummaries(user.getId());
        return bookedTickets;
    }

}
