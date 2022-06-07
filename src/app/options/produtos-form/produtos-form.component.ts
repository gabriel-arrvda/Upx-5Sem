import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { VisualService } from 'src/app/services/visual.service';
import { CameraModalComponent } from 'src/app/shared/camera-modal/camera-modal.component';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss'],
})
export class ProdutosFormComponent implements OnInit {

  codBarras
  form: FormGroup
  fileBase64

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private fbService: FirebaseService,
    private visualService: VisualService 
  ) { }

  ngOnInit() {
    this.createForm()
  }
  
  ionViewDidEnter() {
    this.presentModal()
  }

  createForm() {
    this.form = this.formBuilder.group({
      codBarras: [this.codBarras, Validators.required],
      nome: [null, Validators.required],
      categoria: [null, Validators.required],
      info: [null, Validators.required],
      foto: [null]
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss()
    
    if(data){
      this.codBarras = data.cod
      this.form.get('codBarras').setValue(data.cod)
      this.form.get('codBarras').disable()
    }

    return
  }

  back(){
    this.navController.pop()
  }

  onFilePicked(file) {
    this.fileBase64 = file
  }

  save(){
    this.visualService.genericLoading('Salvando...').then( () => {
      this.fbService.uploadFile(this.fileBase64).then(url => {
        if(url) this.form.get('foto').setValue(url)
  
        this.fbService.saveProduto(this.form.getRawValue()).then(() => {
          this.visualService.closeLoading()
          this.visualService.genericToast("Produto salvo com sucesso")
          this.back()
        }).catch(error => {
          console.error(error)
          this.visualService.closeLoading()
          this.visualService.genericToast(error)
        })
  
      }).catch(err => {
        this.visualService.closeLoading()
        this.visualService.genericToast("Erro ao salvar imagem")
      })
    })

  }

}
