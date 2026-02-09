package com.aroproyecto.seriesapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application class for Series API
 * 
 * This Spring Boot application provides a REST API for TV series,
 * integrating with TMDB (The Movie Database) API.
 */
@SpringBootApplication
public class SeriesApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeriesApiApplication.class, args);
    }
}
