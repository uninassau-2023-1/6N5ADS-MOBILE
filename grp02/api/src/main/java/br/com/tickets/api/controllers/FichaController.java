package br.com.tickets.api.controllers;

import br.com.tickets.api.models.Ficha;
import br.com.tickets.api.models.SenhaTipo;
import br.com.tickets.api.services.FichaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/fichas")
public class FichaController {

    private final FichaService fichaService;

    public FichaController(FichaService fichaService) {
        this.fichaService = fichaService;
    }

    @GetMapping
    public ResponseEntity<List<Ficha>> obterTodasFichas() {
        List<Ficha> fichas = fichaService.obterTodasFichas();
        return new ResponseEntity<>(fichas, HttpStatus.OK);
    }

    @GetMapping("/senha-tipo")
    public ResponseEntity<SenhaTipo[]> obterNumeroSenha() {
        return new ResponseEntity<>(SenhaTipo.values(), HttpStatus.OK);
    }

    @PostMapping("/senha")
    public ResponseEntity<Ficha> obterNumeroSenha(@RequestBody SenhaTipo tipo) {
        Ficha numeroSenha = fichaService.obterNumeroSenha(tipo);
        return new ResponseEntity<>(numeroSenha, HttpStatus.CREATED);
    }
}
