import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>
  @Output() imagePick = new EventEmitter<any>()
  @Input() showPreview = false
  @Input() selectedImage: any
  usePicker = false

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.usePicker = (this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')
  }

  onPickImage() {
    if ( this.usePicker ) {
      this.filePickerRef.nativeElement.click()
      return
    }

    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.DataUrl
    }).then( image => {
      this.selectedImage = image.dataUrl
      this.onFileChosen( undefined, image)
    }).catch( error => {
      console.log(error)
      if ( this.usePicker ) {
        this.filePickerRef.nativeElement.click()
      }
      return false;
    })
  }

  onFileChosen(event: Event, fileDataUrl?) {
    if ( event ) {
      const pickedFile = (event.target as HTMLInputElement).files[0]
      if ( !pickedFile ) {
        return;
      }
  
      const fileReader = new FileReader
      fileReader.onload = () => {
        const dataUrl = fileReader.result.toString()
        this.selectedImage = dataUrl
        this.imagePick.emit(pickedFile)
      }
      fileReader.readAsDataURL(pickedFile)
    } else {
      of(this.dataURLtoFile(fileDataUrl.dataUrl, 'file.jpg'))
        .subscribe( file => {
          this.imagePick.emit(file)
        })
        
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString: string = window.atob(dataURI);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob
  }

  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }
}
