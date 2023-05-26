package br.com.tickets.api.services;

import br.com.tickets.api.models.Ficha;
import br.com.tickets.api.models.SenhaTipo;
import br.com.tickets.api.repositories.FichaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class FichaService {

    public final FichaRepository fichaRepository;

    public FichaService(FichaRepository fichaRepository) {
        this.fichaRepository = fichaRepository;
    }

    public List<Ficha> obterTodasFichas() {
        return this.fichaRepository.findAll();
    }

    public Ficha obterNumeroSenha(SenhaTipo tipo) {
        Ficha ficha = new Ficha();

        LocalDate data = LocalDate.now();

        String ano = String.valueOf(data.getYear());
        String mes = String.valueOf(data.getMonthValue());
        String dia = String.valueOf(data.getDayOfMonth());

        ficha.setToken(ano + mes + dia + "-" + tipo.name() + new Random().nextInt(99));


        return this.fichaRepository.save(ficha);
    }
}
