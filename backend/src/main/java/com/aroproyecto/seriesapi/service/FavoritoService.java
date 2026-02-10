package com.aroproyecto.seriesapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aroproyecto.seriesapi.repository.FavoritoRepository;

@Service
public class FavoritoService {
    private final FavoritoRepository repository;

    public FavoritoService(FavoritoRepository repository) {
        this.repository = repository;
    }

    public List<String> getFavoritos(String usuarioId) {
        return repository.findByUsuario(usuarioId);
    }

    public void addFavorito(String usuarioId, String seriesId) {
        repository.save(usuarioId, seriesId);
    }
}