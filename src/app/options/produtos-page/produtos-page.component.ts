import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.scss'],
})
export class ProdutosPageComponent implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {}

  back(){
    this.navController.pop()
  }
}
