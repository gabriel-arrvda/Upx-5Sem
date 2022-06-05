import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CameraModalComponent } from 'src/app/shared/camera-modal/camera-modal.component';

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.scss'],
})
export class ProdutosPageComponent implements OnInit {

  produtos$: Observable<any[]>

  constructor(
    private navController: NavController,
    private fbService: FirebaseService,
  ) { }

  ngOnInit() {
    this.produtos$ = this.fbService.getProdutos()
  }

  back(){
    this.navController.pop()
  }

  trackById(i, product) {
    return product.id;
  }

}
