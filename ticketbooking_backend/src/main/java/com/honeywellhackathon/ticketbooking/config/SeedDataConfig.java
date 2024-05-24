package com.honeywellhackathon.ticketbooking.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class SeedDataConfig {

    public static List<String> generateSeatIds(int rows, int seatsPerRow) {
        List<String> seatIds = new ArrayList<>();

        for (char row = 'A'; row < 'A' + rows; row++) {
            for (int seat = 1; seat <= seatsPerRow; seat++) {
                seatIds.add(row + String.valueOf(seat));
            }
        }
        return seatIds;
    }

    @Bean
    ApplicationRunner seedDataRunner(JdbcTemplate jdbcTemplate) {
        return args -> {
            List<String> seatIds = generateSeatIds(5, 10);
            seatIds.forEach(seatId -> {
                String innerTemplate = """
                        SELECT %d AS movie_id, '%s'::timestamp AS show_at
                        UNION ALL
                        SELECT %d AS movie_id, '%s'::timestamp AS show_at
                        UNION ALL
                        SELECT %d AS movie_id, '%s'::timestamp AS show_at
                        """;

                String innerQuery1 = String.format(innerTemplate,
                        1, "2024-05-23 10:00:00",
                        2, "2024-05-23 14:00:00",
                        3, "2024-05-23 18:00:00");

                String innerQuery2 = String.format(innerTemplate,
                        1, "2024-05-24 10:00:00",
                        2, "2024-05-24 14:00:00",
                        3, "2024-05-24 18:00:00");

                String innerQuery3 = String.format(innerTemplate,
                        1, "2024-05-25 10:00:00",
                        2, "2024-05-25 14:00:00",
                        3, "2024-05-25 18:00:00");

                String insertTemplate = """
                        INSERT INTO tickets (seat_name, movie_id, show_at)
                        SELECT '%s', movie_id, show_at
                        FROM (
                            %s
                        ) AS shows;
                        """;

                String insertData = String.format(insertTemplate, seatId, innerQuery1)
                        + String.format(insertTemplate, seatId, innerQuery2)
                        + String.format(insertTemplate, seatId, innerQuery3);

                System.out.println(insertData);
                jdbcTemplate.execute(insertData);
            });
        };
    }
}
