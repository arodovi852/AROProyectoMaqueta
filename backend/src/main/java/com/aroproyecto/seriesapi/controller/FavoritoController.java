package com.aroproyecto.seriesapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aroproyecto.seriesapi.service.FavoritoService;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {
    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<String>> getFavoritos(
            @PathVariable String usuarioId,
            @RequestHeader(value = "X-User-Id", required = false) String headerUserId) {
        if (headerUserId == null || !headerUserId.equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(favoritoService.getFavoritos(usuarioId));
    }

    @PostMapping("/{usuarioId}/{seriesId}")
    public ResponseEntity<String> addFavorito(
            @PathVariable String usuarioId,
            @PathVariable String seriesId,
            @RequestHeader(value = "X-User-Id", required = false) String headerUserId) {
        if (headerUserId == null || !headerUserId.equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        favoritoService.addFavorito(usuarioId, seriesId);
        return ResponseEntity.ok("Añadido");
    }
}