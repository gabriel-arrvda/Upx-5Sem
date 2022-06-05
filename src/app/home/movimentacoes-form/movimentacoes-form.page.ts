import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-movimentacoes-form',
  templateUrl: './movimentacoes-form.page.html',
  styleUrls: ['./movimentacoes-form.page.scss'],
})
export class MovimentacoesFormPage implements OnInit {

  constructor(
    private navController: NavController,
  ) { }

  ngOnInit() {
    
  }

  back(){
    this.navController.pop()
  }

}
