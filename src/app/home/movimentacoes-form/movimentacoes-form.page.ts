import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { VisualService } from 'src/app/services/visual.service';
import { CameraModalComponent } from 'src/app/shared/camera-modal/camera-modal.component';

@Component({
  selector: 'app-movimentacoes-form',
  templateUrl: './movimentacoes-form.page.html',
  styleUrls: ['./movimentacoes-form.page.scss'],
})
export class MovimentacoesFormPage implements OnInit {

  produtos: any[] = []

  constructor(
    private navController: NavController,
    private fbService: FirebaseService,
    private modalController: ModalController,
    private visualService: VisualService
  ) { }

  ngOnInit() {
    
  }

  save(){
    this.visualService.genericLoading().then( () => {
      this.fbService.saveSaida(this.produtos).then(() => {
        this.visualService.closeLoading()
        this.visualService.genericToast('Saida salva com sucesso')
        this.back()
      }).catch((err) => {
        this.visualService.closeLoading()
        this.visualService.genericToast(err)
      })
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss()
    
    if(data){
      this.visualService.genericLoading().then( () => {
        this.fbService.getProduto(data.cod).then((produto) => {
          this.visualService.closeLoading()

          if(this.produtos.some((produto) => produto.id === produto.id)){
            this.visualService.genericToast("Produto já adicionado")
            return
          }

          this.produtos.push(produto)
        }).catch((err) => {
          this.visualService.closeLoading()
          this.visualService.genericToast(err)
        })
      })
    }

    return
  }

  back(){
    this.navController.pop()
    this.produtos = []
  }

}
