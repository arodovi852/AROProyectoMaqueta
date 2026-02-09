package com.aroproyecto.seriesapi.model;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Series entity representing a TV show
 */
public class Series {
    
    private String id;
    private String title;
    private String description;
    private Integer year;
    private Double rating;
    private String imageUrl;
    private List<String> genre;
    private Integer seasons;
    private SeriesStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum SeriesStatus {
        ongoing,
        ended,
        upcoming
    }

    public Series() {
    }

    public Series(String id, String title, String description, Integer year, Double rating,
                  String imageUrl, List<String> genre, Integer seasons, SeriesStatus status,
                  LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.genre = genre;
        this.seasons = seasons;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public List<String> getGenre() { return genre; }
    public void setGenre(List<String> genre) { this.genre = genre; }
    public Integer getSeasons() { return seasons; }
    public void setSeasons(Integer seasons) { this.seasons = seasons; }
    public SeriesStatus getStatus() { return status; }
    public void setStatus(SeriesStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String title;
        private String description;
        private Integer year;
        private Double rating;
        private String imageUrl;
        private List<String> genre;
        private Integer seasons;
        private SeriesStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder year(Integer year) { this.year = year; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder genre(List<String> genre) { this.genre = genre; return this; }
        public Builder seasons(Integer seasons) { this.seasons = seasons; return this; }
        public Builder status(SeriesStatus status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Series build() {
            return new Series(id, title, description, year, rating, imageUrl, 
                            genre, seasons, status, createdAt, updatedAt);
        }
    }
}
