import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { IonicModule } from '@ionic/angular';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CameraModalComponent } from './camera-modal/camera-modal.component';

@NgModule({
  declarations: [
    FilterPipe,
    UnixTimePipe,
    CameraModalComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    FilterPipe,
    UnixTimePipe,
    CameraModalComponent
  ],
  providers: [
  ],
})
export class SharedModule { }
