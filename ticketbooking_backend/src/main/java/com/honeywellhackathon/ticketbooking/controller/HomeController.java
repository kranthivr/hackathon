package com.honeywellhackathon.ticketbooking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.honeywellhackathon.ticketbooking.dto.LoginDto;
import com.honeywellhackathon.ticketbooking.model.Movie;
import com.honeywellhackathon.ticketbooking.model.User;
import com.honeywellhackathon.ticketbooking.repo.MoviesRepo;
import com.honeywellhackathon.ticketbooking.repo.UserRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class HomeController {

    private UserRepo userRepo;
    private MoviesRepo moviesRepo;

    public HomeController(UserRepo userRepo, MoviesRepo moviesRepo) {
        this.userRepo = userRepo;
        this.moviesRepo = moviesRepo;
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

}
