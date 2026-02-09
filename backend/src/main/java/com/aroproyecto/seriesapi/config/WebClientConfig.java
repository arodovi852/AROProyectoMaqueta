package com.aroproyecto.seriesapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * WebClient configuration for TMDB API calls
 */
@Configuration
public class WebClientConfig {

    @Value("${tmdb.api.base-url}")
    private String tmdbBaseUrl;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    @Bean
    public WebClient tmdbWebClient() {
        return WebClient.builder()
                .baseUrl(tmdbBaseUrl)
                .defaultHeader("Authorization", "Bearer " + tmdbApiKey)
                .defaultHeader("Accept", "application/json")
                .build();
    }
}
