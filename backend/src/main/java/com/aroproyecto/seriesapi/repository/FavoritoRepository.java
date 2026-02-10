package com.aroproyecto.seriesapi.repository;

import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class FavoritoRepository {
    private final Map<String, List<String>> store = new HashMap<>();
}