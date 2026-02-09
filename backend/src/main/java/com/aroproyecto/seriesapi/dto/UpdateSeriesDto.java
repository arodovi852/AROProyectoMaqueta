package com.aroproyecto.seriesapi.dto;

import com.aroproyecto.seriesapi.model.Series;

import java.util.List;

/**
 * DTO for updating a series (partial update)
 */
public class UpdateSeriesDto {
    
    private String title;
    private String description;
    private Integer year;
    private List<String> genre;
    private Integer seasons;
    private Series.SeriesStatus status;

    public UpdateSeriesDto() {
    }

    public UpdateSeriesDto(String title, String description, Integer year,
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
