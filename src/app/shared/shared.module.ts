import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { IonicModule } from '@ionic/angular';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CameraModalComponent } from './camera-modal/camera-modal.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
  declarations: [
    FilterPipe,
    UnixTimePipe,
    CameraModalComponent,
    ImagePickerComponent
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
    CameraModalComponent,
    ImagePickerComponent
  ],
  providers: [
  ],
})
export class SharedModule { }
