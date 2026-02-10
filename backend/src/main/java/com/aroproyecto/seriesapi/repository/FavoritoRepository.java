package com.aroproyecto.seriesapi.repository;

import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class FavoritoRepository {
    private final Map<String, List<String>> store = new HashMap<>();

    public List<String> findByUsuario(String usuarioId) {
        return store.getOrDefault(usuarioId, new ArrayList<>());
    }

    public void save(String usuarioId, String seriesId) {
        store.computeIfAbsent(usuarioId, k -> new ArrayList<>()).add(seriesId);
    }
}