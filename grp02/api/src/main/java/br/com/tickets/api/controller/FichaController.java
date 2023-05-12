package br.com.tickets.api.controller;

import br.com.tickets.api.Ficha;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/ficha")
public class FichaController {


    @GetMapping("/prioridades")
    public ResponseEntity<List<Ficha>> obterPrioridades() {
        List<Ficha> fichas = new ArrayList<>();

        Ficha ficha1 = new Ficha();
        Ficha ficha2 = new Ficha();

        ficha1.setId(1L);
        ficha1.setNome("PRI-001");

        ficha2.setId(2L);
        ficha2.setNome("PRI-002");

        fichas.add(ficha1);
        fichas.add(ficha2);

        return new ResponseEntity<>(fichas, HttpStatus.OK);
    }
}
