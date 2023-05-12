<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ficha</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-select
          interface="action-sheet"
          placeholder="Prioridade"
          v-model="teste"
        >
          <ion-select-option
            :value="prioridade.id"
            v-for="prioridade in prioridades"
            :key="prioridade"
            >{{ prioridade.nome }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { fichaController } from "../controller/fichaController";

export default {
  data() {
    return {
      teste: null,
      prioridades: [],
    };
  },
  mounted() {
    this.obterPrioridades();
  },
  methods: {
    obterPrioridades() {
      fichaController.obterPrioridades().then((res) => {
        this.prioridades = res.data;
      });
    },
  },
};
</script>