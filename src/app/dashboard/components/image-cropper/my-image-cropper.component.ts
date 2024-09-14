import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'dashboard-image-cropper',
  templateUrl: './my-image-cropper.component.html',
})
export class MyImageCropperComponent implements OnInit {
  @ViewChild('myInputFile') myInputFile!: ElementRef;

  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter<File>();

  @Input()
  public class: string = '';

  private mainContainer = document.getElementById('main-container');

  public imageChangedEvent: Event | null = null;
  public croppedImage?: Blob;
  public finalCroppedImage?: Blob;
  public blobConvertedToFile?: File;
  public isCropped = false;
  public showImageCropper = false;

  constructor() {}

  ngOnInit(): void {}

  fileChangeEvent(event: Event): void {
    this.mainContainer?.classList.add('overflow-hidden');
    this.mainContainer?.classList.add('max-h-screen');

    this.imageChangedEvent = event;
    this.isCropped = false;
    this.showImageCropper = true;
    this.finalCroppedImage = undefined;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob!;
  }

  imageLoaded(image: LoadedImage) {
    // Se ejecuta cuando la imagen se ha cargado correctamente
    console.log('Imagen cargada');
  }

  cropperReady() {
    // Se ejecuta cuando el recortador está listo
    console.log('Recortador listo');
  }

  loadImageFailed() {
    // Se ejecuta si hubo un error al cargar la imagen
    console.log('Error al cargar la imagen');
  }

  confirmCrop() {
    this.finalCroppedImage = this.croppedImage;
    this.isCropped = true;
    this.showImageCropper = false;

    this.mainContainer?.classList.remove('overflow-hidden');
    this.mainContainer?.classList.remove('max-h-screen');

    this.blobConvertedToFile = new File(
      [this.finalCroppedImage!],
      'cropped-image.jpg',
      {
        type: 'image/jpeg',
      }
    );

    this.fileSelected.emit(this.blobConvertedToFile);
  }

  cancelCrop() {
    this.isCropped = false;
    this.showImageCropper = false;
    this.finalCroppedImage = undefined;
    this.croppedImage = undefined;

    this.mainContainer?.classList.remove('overflow-hidden');
    this.mainContainer?.classList.remove('max-h-screen');
  }

  openFileDialog() {
    this.myInputFile.nativeElement.click();
  }
}
