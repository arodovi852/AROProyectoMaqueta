package com.aroproyecto.seriesapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 * 
 * Provides endpoints for monitoring API health status.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now().toString());
        health.put("service", "Series API");
        health.put("version", "1.0.0");
        return ResponseEntity.ok(health);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> apiInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "Series API");
        info.put("version", "1.0.0");
        info.put("description", "REST API for TV Series - TMDB Integration");
        info.put("endpoints", Map.of(
            "series", "/api/series",
            "search", "/api/series/search",
            "genres", "/api/series/genres",
            "health", "/api/health"
        ));
        return ResponseEntity.ok(info);
    }
}
