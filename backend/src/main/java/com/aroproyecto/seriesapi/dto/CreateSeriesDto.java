package com.aroproyecto.seriesapi.dto;

import com.aroproyecto.seriesapi.model.Series;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * DTO for creating a new series
 */
public class CreateSeriesDto {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be 1900 or later")
    private Integer year;
    
    private List<String> genre;
    
    @Min(value = 1, message = "Seasons must be at least 1")
    private Integer seasons;
    
    @NotNull(message = "Status is required")
    private Series.SeriesStatus status;

    public CreateSeriesDto() {
    }

    public CreateSeriesDto(String title, String description, Integer year, 
                          List<String> genre, Integer seasons, Series.SeriesStatus status) {
        this.title = title;
        this.description = description;
        this.year = year;
        this.genre = genre;
        this.seasons = seasons;
        this.status = status;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public List<String> getGenre() { return genre; }
    public void setGenre(List<String> genre) { this.genre = genre; }
    public Integer getSeasons() { return seasons; }
    public void setSeasons(Integer seasons) { this.seasons = seasons; }
    public Series.SeriesStatus getStatus() { return status; }
    public void setStatus(Series.SeriesStatus status) { this.status = status; }
}
