import { http } from "../model/fichaModel";

export const fichaController = {
    obterPrioridades() {
        return http.get('/senha-tipo')
    },
    obterFicha(tipo) {
        return http.post('/senha', tipo)
    }
}