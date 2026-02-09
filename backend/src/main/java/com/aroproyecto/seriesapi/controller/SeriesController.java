package com.aroproyecto.seriesapi.controller;

import com.aroproyecto.seriesapi.dto.CreateSeriesDto;
import com.aroproyecto.seriesapi.dto.PaginatedResponse;
import com.aroproyecto.seriesapi.dto.UpdateSeriesDto;
import com.aroproyecto.seriesapi.model.Series;
import com.aroproyecto.seriesapi.service.SeriesService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Series API
 * 
 * Provides CRUD endpoints for TV series management.
 * Compatible with Angular frontend SeriesService.
 */
@RestController
@RequestMapping("/api/series")
public class SeriesController {

    private static final Logger log = LoggerFactory.getLogger(SeriesController.class);
    private final SeriesService seriesService;

    public SeriesController(SeriesService seriesService) {
        this.seriesService = seriesService;
    }

    /**
     * GET /api/series - Get all series
     */
    @GetMapping
    public ResponseEntity<List<Series>> getAllSeries() {
        log.debug("GET /api/series - Fetching all series");
        List<Series> series = seriesService.getAllSeries();
        return ResponseEntity.ok(series);
    }

    /**
     * GET /api/series/{id} - Get series by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Series> getSeriesById(@PathVariable String id) {
        log.debug("GET /api/series/{} - Fetching series by ID", id);
        return seriesService.getSeriesById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/series/paginated - Get series with pagination and filters
     */
    @GetMapping("/paginated")
    public ResponseEntity<PaginatedResponse<Series>> getSeriesPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String genre) {
        
        log.debug("GET /api/series/paginated - page={}, pageSize={}, search={}, genre={}", 
            page, pageSize, search, genre);
        
        PaginatedResponse<Series> response = seriesService.getSeriesFiltered(page, pageSize, search, genre);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/series/search - Search series by query
     */
    @GetMapping("/search")
    public ResponseEntity<List<Series>> searchSeries(@RequestParam String query) {
        log.debug("GET /api/series/search - query={}", query);
        List<Series> results = seriesService.searchSeries(query);
        return ResponseEntity.ok(results);
    }

    /**
     * GET /api/series/genres - Get all available genres
     */
    @GetMapping("/genres")
    public ResponseEntity<List<String>> getAllGenres() {
        log.debug("GET /api/series/genres - Fetching all genres");
        List<String> genres = seriesService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    /**
     * POST /api/series - Create a new series
     */
    @PostMapping
    public ResponseEntity<Series> createSeries(@Valid @RequestBody CreateSeriesDto dto) {
        log.debug("POST /api/series - Creating series: {}", dto.getTitle());
        Series created = seriesService.createSeries(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PUT /api/series/{id} - Update a series
     */
    @PutMapping("/{id}")
    public ResponseEntity<Series> updateSeries(
            @PathVariable String id,
            @Valid @RequestBody UpdateSeriesDto dto) {
        
        log.debug("PUT /api/series/{} - Updating series", id);
        return seriesService.updateSeries(id, dto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * PATCH /api/series/{id} - Partial update a series
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Series> patchSeries(
            @PathVariable String id,
            @RequestBody UpdateSeriesDto dto) {
        
        log.debug("PATCH /api/series/{} - Patching series", id);
        return seriesService.updateSeries(id, dto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/series/{id} - Delete a series
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeries(@PathVariable String id) {
        log.debug("DELETE /api/series/{} - Deleting series", id);
        if (seriesService.deleteSeries(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
