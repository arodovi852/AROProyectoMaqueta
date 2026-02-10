package com.aroproyecto.seriesapi.controller;
import com.aroproyecto.seriesapi.model.Series;

import com.aroproyecto.seriesapi.service.FavoritoService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/favoritos")
public class FavoritoController {
    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }


@GetMapping("/favoritos")

public ResponseEntity<List<Series>> getFavoritos(){

}
}