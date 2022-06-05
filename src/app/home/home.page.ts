import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  movimentacoes$: Observable<any>

  constructor(
    private fbService: FirebaseService
  ) {}

  ngOnInit() {
    this.movimentacoes$ = this.fbService.getMovimentacoes()
  }

  trackById(i, movimentacao) {
    return movimentacao.id;
  }
}
