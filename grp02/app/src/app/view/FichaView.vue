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
          v-model="prioridadeTipo"
        >
          <ion-select-option
            :value="prioridade"
            v-for="prioridade in prioridades"
            :key="prioridade"
            >{{ prioridade }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button @click="obterFicha">Pedir Ficha</ion-button>

      <ion-card-header v-if="ficha">
        <ion-card-title>Senha</ion-card-title>
        <ion-card-subtitle>{{ ficha.token }}</ion-card-subtitle> </ion-card-header
      >
    </ion-content>
  </ion-page>
</template>

<script>
import { fichaController } from "../controller/fichaController";

export default {
  data() {
    return {
      prioridadeTipo: null,
      prioridades: [],
      ficha: null,
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

    obterFicha() {
      fichaController.obterFicha(this.prioridadeTipo).then((res) => {
        this.ficha = res.data;
      });
    },
  },
};
</script>