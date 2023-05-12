import { http } from "../model/fichaModel";

export const fichaController = {
    obterPrioridades() {
        return http.get('/prioridades')
    }
}