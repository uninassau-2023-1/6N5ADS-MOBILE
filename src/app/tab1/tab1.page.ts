import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public senhasService: SenhasService) {}

  get inputNovaSenha(): string {
    return this.senhasService.inputNovaSenha;
  } //foi preciso criar o get pois estava dando erro.

}