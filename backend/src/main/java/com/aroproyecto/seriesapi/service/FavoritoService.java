package com.aroproyecto.seriesapi.service;

import com.aroproyecto.seriesapi.dto.CreateSeriesDto;
import com.aroproyecto.seriesapi.dto.PaginatedResponse;
import com.aroproyecto.seriesapi.dto.UpdateSeriesDto;
import com.aroproyecto.seriesapi.model.Series;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    private static final Logger log = LoggerFactory.getLogger(FavoritoService.class);

    @Value("${api.mock-mode:true}")
    private boolean mockMode;

    @Value("${tmdb.api.image-base-url:https://image.tmdb.org/t/p/w500}")
    private String imageBaseUrl;

    // In-memory storage for mock data
    private final Map<String, Series> seriesStore = new ConcurrentHashMap<>();
    private long nextId = 1;

    /**
     * Initialize mock data on startup
     */
    @PostConstruct
    public void init() {
        if (mockMode) {
            log.info("Running in MOCK MODE - initializing sample data");
            initializeMockData();
        } else {
            log.info("Running in API MODE - will connect to TMDB");
        }
    }

    /**
     * Initialize mock data matching the Angular frontend
     */
    private void initializeMockData() {
        List<Series> mockSeries = Arrays.asList(
            Series.builder()
                .id("1")
                .title("Twin Peaks")
                .description("A mystery series about the investigation of Laura Palmer's death.")
                .year(1990)
                .rating(4.5)
                .imageUrl("/assets/Images_For_Card_1.jpg")
                .genre(Arrays.asList("Drama", "Mystery", "Horror"))
                .seasons(3)
                .status(Series.SeriesStatus.ended)
                .createdAt(LocalDateTime.of(2024, 1, 1, 0, 0))
                .build(),
            
            Series.builder()
                .id("2")
                .title("Stranger Things")
                .description("A group of friends discover supernatural phenomena in their small town.")
                .year(2016)
                .rating(4.7)
                .imageUrl("/assets/Images_For_Card_2.jpg")
                .genre(Arrays.asList("Drama", "Fantasy", "Horror"))
                .seasons(4)
                .status(Series.SeriesStatus.ongoing)
                .createdAt(LocalDateTime.of(2024, 1, 2, 0, 0))
                .build(),
            
            Series.builder()
                .id("3")
                .title("Alien: Earth")
                .description("Spin-off of the Alien franchise set on Earth.")
                .year(2025)
                .rating(0.0)
                .imageUrl("/assets/Image_For_Card_3.jpg")
                .genre(Arrays.asList("Sci-Fi", "Horror"))
                .seasons(1)
                .status(Series.SeriesStatus.upcoming)
                .createdAt(LocalDateTime.of(2024, 1, 3, 0, 0))
                .build(),
            
            Series.builder()
                .id("4")
                .title("The Haunting of Hill House")
                .description("A family confronted with traumatic memories of a haunted house.")
                .year(2018)
                .rating(4.8)
                .imageUrl("/assets/Image_For_Card_4.jpg")
                .genre(Arrays.asList("Drama", "Horror", "Thriller"))
                .seasons(1)
                .status(Series.SeriesStatus.ended)
                .createdAt(LocalDateTime.of(2024, 1, 4, 0, 0))
                .build(),
            
            Series.builder()
                .id("5")
                .title("The Walking Dead")
                .description("Survivors fight to survive in a zombie apocalypse.")
                .year(2010)
                .rating(4.2)
                .imageUrl("/assets/Image_For_Card_5.jpg")
                .genre(Arrays.asList("Drama", "Horror", "Thriller"))
                .seasons(11)
                .status(Series.SeriesStatus.ended)
                .createdAt(LocalDateTime.of(2024, 1, 5, 0, 0))
                .build(),
            
            Series.builder()
                .id("6")
                .title("Breaking Bad")
                .description("A chemistry teacher becomes a methamphetamine manufacturer.")
                .year(2008)
                .rating(4.9)
                .imageUrl("/assets/Image_For_Card_6.jpg")
                .genre(Arrays.asList("Drama", "Crime", "Thriller"))
                .seasons(5)
                .status(Series.SeriesStatus.ended)
                .createdAt(LocalDateTime.of(2024, 1, 6, 0, 0))
                .build(),
            
            Series.builder()
                .id("7")
                .title("It: Welcome to Derry")
                .description("IT prequel set in the 60s, exploring the origins of terror in Derry.")
                .year(2025)
                .rating(0.0)
                .imageUrl("/assets/Images_For_Card_7.png")
                .genre(Arrays.asList("Horror", "Drama"))
                .seasons(1)
                .status(Series.SeriesStatus.upcoming)
                .createdAt(LocalDateTime.of(2024, 1, 7, 0, 0))
                .build(),
            
            Series.builder()
                .id("8")
                .title("Buffy the Vampire Slayer")
                .description("A young woman chosen to fight vampires, demons and dark forces.")
                .year(1997)
                .rating(4.6)
                .imageUrl("/assets/Images_For_Card_8.png")
                .genre(Arrays.asList("Fantasy", "Drama", "Horror"))
                .seasons(7)
                .status(Series.SeriesStatus.ended)
                .createdAt(LocalDateTime.of(2024, 1, 8, 0, 0))
                .build(),
            
            Series.builder()
                .id("9")
                .title("Black Mirror")
                .description("Sci-fi anthology that explores the consequences of technology.")
                .year(2011)
                .rating(4.7)
                .imageUrl("/assets/Images_For_Card_9.jpg")
                .genre(Arrays.asList("Sci-Fi", "Drama", "Thriller"))
                .seasons(6)
                .status(Series.SeriesStatus.ongoing)
                .createdAt(LocalDateTime.of(2024, 1, 9, 0, 0))
                .build(),
            
            Series.builder()
                .id("10")
                .title("The Creep Tapes")
                .description("Found footage horror series based on the Creep film franchise.")
                .year(2025)
                .rating(0.0)
                .imageUrl("/assets/Images_For_Card_10.jpg")
                .genre(Arrays.asList("Horror", "Found Footage"))
                .seasons(1)
                .status(Series.SeriesStatus.upcoming)
                .createdAt(LocalDateTime.of(2024, 1, 10, 0, 0))
                .build(),
            
            Series.builder()
                .id("11")
                .title("Smiling Friends")
                .description("Animated comedy about a small company dedicated to making people smile.")
                .year(2022)
                .rating(4.5)
                .imageUrl("/assets/Images_For_Card_11.jpg")
                .genre(Arrays.asList("Animation", "Comedy"))
                .seasons(2)
                .status(Series.SeriesStatus.ongoing)
                .createdAt(LocalDateTime.of(2024, 1, 11, 0, 0))
                .build(),
            
            Series.builder()
                .id("12")
                .title("JoJo's Bizarre Adventure")
                .description("Saga multigeneracional de la familia Joestar enfrentando amenazas sobrenaturales.")
                .year(2012)
                .rating(4.8)
                .imageUrl("/assets/Images_For_Card_12.jpg")
                .genre(Arrays.asList("Animation", "Action", "Adventure"))
                .seasons(6)
                .status(Series.SeriesStatus.ongoing)
                .createdAt(LocalDateTime.of(2024, 1, 12, 0, 0))
                .build()
        );

        for (Series series : mockSeries) {
            seriesStore.put(series.getId(), series);
        }
        nextId = mockSeries.size() + 1;
        
        log.info("Initialized {} mock series", seriesStore.size());
    }

    /**
     * Get all series
     */
    public List<Series> getAllSeries() {
        return new ArrayList<>(seriesStore.values());
    }

    /**
     * Get series by ID
     */
    public Optional<Series> getSeriesById(String id) {
        return Optional.ofNullable(seriesStore.get(id));
    }

    /**
     * Get series with pagination and filtering
     */
    public PaginatedResponse<Series> getSeriesFiltered(int page, int pageSize, String search, String genre) {
        List<Series> filtered = seriesStore.values().stream()
            .filter(series -> {
                // Search filter
                if (search != null && !search.isEmpty()) {
                    String searchLower = search.toLowerCase();
                    boolean matches = series.getTitle().toLowerCase().contains(searchLower) ||
                                     series.getDescription().toLowerCase().contains(searchLower);
                    if (!matches) return false;
                }
                
                // Genre filter
                if (genre != null && !genre.isEmpty()) {
                    if (!series.getGenre().contains(genre)) return false;
                }
                
                return true;
            })
            .sorted(Comparator.comparing(Series::getCreatedAt).reversed())
            .collect(Collectors.toList());

        int total = filtered.size();
        int start = (page - 1) * pageSize;
        int end = Math.min(start + pageSize, total);
        
        List<Series> items = start < total 
            ? filtered.subList(start, end) 
            : Collections.emptyList();

        return PaginatedResponse.<Series>builder()
            .items(items)
            .total(total)
            .page(page)
            .pageSize(pageSize)
            .build();
    }

    /**
     * Create a new series
     */
    public Series createSeries(CreateSeriesDto dto) {
        String id = String.valueOf(nextId++);
        
        Series series = Series.builder()
            .id(id)
            .title(dto.getTitle())
            .description(dto.getDescription())
            .year(dto.getYear())
            .rating(0.0)
            .imageUrl("/assets/placeholder.jpg")
            .genre(dto.getGenre() != null ? dto.getGenre() : Collections.emptyList())
            .seasons(dto.getSeasons() != null ? dto.getSeasons() : 1)
            .status(dto.getStatus())
            .createdAt(LocalDateTime.now())
            .build();

        seriesStore.put(id, series);
        log.info("Created new series: {} (ID: {})", series.getTitle(), id);
        
        return series;
    }

    /**
     * Update an existing series
     */
    public Optional<Series> updateSeries(String id, UpdateSeriesDto dto) {
        Series existing = seriesStore.get(id);
        if (existing == null) {
            return Optional.empty();
        }

        // Apply partial updates
        if (dto.getTitle() != null) existing.setTitle(dto.getTitle());
        if (dto.getDescription() != null) existing.setDescription(dto.getDescription());
        if (dto.getYear() != null) existing.setYear(dto.getYear());
        if (dto.getGenre() != null) existing.setGenre(dto.getGenre());
        if (dto.getSeasons() != null) existing.setSeasons(dto.getSeasons());
        if (dto.getStatus() != null) existing.setStatus(dto.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        seriesStore.put(id, existing);
        log.info("Updated series: {} (ID: {})", existing.getTitle(), id);
        
        return Optional.of(existing);
    }

    /**
     * Delete a series
     */
    public boolean deleteSeries(String id) {
        Series removed = seriesStore.remove(id);
        if (removed != null) {
            log.info("Deleted series: {} (ID: {})", removed.getTitle(), id);
            return true;
        }
        return false;
    }

    /**
     * Search series by title (simulating TMDB search)
     */
    public List<Series> searchSeries(String query) {
        if (query == null || query.isEmpty()) {
            return Collections.emptyList();
        }
        
        String queryLower = query.toLowerCase();
        return seriesStore.values().stream()
            .filter(series -> series.getTitle().toLowerCase().contains(queryLower))
            .collect(Collectors.toList());
    }

    /**
     * Get unique genres from all series
     */
    public List<String> getAllGenres() {
        return seriesStore.values().stream()
            .flatMap(series -> series.getGenre().stream())
            .distinct()
            .sorted()
            .collect(Collectors.toList());
    }
}
