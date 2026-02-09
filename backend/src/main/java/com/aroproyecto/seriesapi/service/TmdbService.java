package com.aroproyecto.seriesapi.service;

import com.aroproyecto.seriesapi.model.Series;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * TMDB API Service
 * 
 * Integrates with The Movie Database API for TV series data.
 * API Documentation: https://developer.themoviedb.org/reference/search-tv
 * 
 * Note: This service is prepared for future TMDB integration.
 * Currently, the application runs in mock mode by default.
 */
@Service
public class TmdbService {

    private static final Logger log = LoggerFactory.getLogger(TmdbService.class);
    private final WebClient tmdbWebClient;

    @Value("${tmdb.api.image-base-url}")
    private String imageBaseUrl;

    public TmdbService(WebClient tmdbWebClient) {
        this.tmdbWebClient = tmdbWebClient;
    }

    /**
     * Search TV shows on TMDB
     * 
     * @param query Search query string
     * @param page Page number (1-based)
     * @return List of matching series
     */
    public Mono<List<Series>> searchTvShows(String query, int page) {
        log.debug("Searching TMDB for: {} (page {})", query, page);

        return tmdbWebClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/search/tv")
                .queryParam("query", query)
                .queryParam("page", page)
                .queryParam("include_adult", false)
                .queryParam("language", "en-US")
                .build())
            .retrieve()
            .bodyToMono(TmdbSearchResponse.class)
            .map(this::convertToSeriesList)
            .doOnError(error -> log.error("TMDB API error: ", error))
            .onErrorReturn(Collections.emptyList());
    }

    /**
     * Get TV show details from TMDB
     * 
     * @param tmdbId TMDB TV show ID
     * @return Series details
     */
    public Mono<Series> getTvShowDetails(int tmdbId) {
        log.debug("Fetching TMDB details for ID: {}", tmdbId);

        return tmdbWebClient.get()
            .uri("/tv/{tv_id}", tmdbId)
            .retrieve()
            .bodyToMono(TmdbTvShow.class)
            .map(this::convertToSeries)
            .doOnError(error -> log.error("TMDB API error: ", error));
    }

    /**
     * Get popular TV shows from TMDB
     * 
     * @param page Page number
     * @return List of popular series
     */
    public Mono<List<Series>> getPopularTvShows(int page) {
        log.debug("Fetching popular TV shows (page {})", page);

        return tmdbWebClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/tv/popular")
                .queryParam("page", page)
                .queryParam("language", "en-US")
                .build())
            .retrieve()
            .bodyToMono(TmdbSearchResponse.class)
            .map(this::convertToSeriesList)
            .onErrorReturn(Collections.emptyList());
    }

    /**
     * Convert TMDB search response to our Series model
     */
    private List<Series> convertToSeriesList(TmdbSearchResponse response) {
        if (response == null || response.results == null) {
            return Collections.emptyList();
        }

        return response.results.stream()
            .map(this::convertToSeries)
            .collect(Collectors.toList());
    }

    /**
     * Convert a TMDB TV show to our Series model
     */
    private Series convertToSeries(TmdbTvShow tvShow) {
        String imageUrl = tvShow.posterPath != null 
            ? imageBaseUrl + tvShow.posterPath 
            : "/assets/placeholder.jpg";

        int year = 0;
        if (tvShow.firstAirDate != null && tvShow.firstAirDate.length() >= 4) {
            try {
                year = Integer.parseInt(tvShow.firstAirDate.substring(0, 4));
            } catch (NumberFormatException e) {
                log.warn("Could not parse year from: {}", tvShow.firstAirDate);
            }
        }

        Series.SeriesStatus status = Series.SeriesStatus.ongoing;
        if ("Ended".equalsIgnoreCase(tvShow.status)) {
            status = Series.SeriesStatus.ended;
        } else if ("In Production".equalsIgnoreCase(tvShow.status) || 
                   "Planned".equalsIgnoreCase(tvShow.status)) {
            status = Series.SeriesStatus.upcoming;
        }

        return Series.builder()
            .id(String.valueOf(tvShow.id))
            .title(tvShow.name)
            .description(tvShow.overview)
            .year(year)
            .rating(tvShow.voteAverage != null ? tvShow.voteAverage / 2.0 : 0.0) // Convert 10-scale to 5-scale
            .imageUrl(imageUrl)
            .genre(Collections.emptyList()) // Would need genre lookup
            .seasons(tvShow.numberOfSeasons != null ? tvShow.numberOfSeasons : 1)
            .status(status)
            .createdAt(LocalDateTime.now())
            .build();
    }

    // TMDB API Response DTOs (internal)
    
    private static class TmdbSearchResponse {
        public int page;
        public List<TmdbTvShow> results;
        public int totalPages;
        public int totalResults;
    }

    private static class TmdbTvShow {
        public int id;
        public String name;
        public String overview;
        public String posterPath;
        public String firstAirDate;
        public Double voteAverage;
        public Integer numberOfSeasons;
        public String status;
        public List<Integer> genreIds;
    }
}
