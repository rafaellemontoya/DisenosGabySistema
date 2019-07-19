import { Component, OnInit } from '@angular/core';
import { Producto } from '../../intefaces/producto.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Empleado } from 'src/app/intefaces/empleado.interface';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';
import { Clasificacion } from '../../intefaces/clasificacion.interface';
@Component({
  selector: 'app-nueva-clasificacion',
  templateUrl: './nueva-clasificacion.component.html',
  styleUrls: ['./nueva-clasificacion.component.css']
})
export class NuevaClasificacionComponent implements OnInit {

  selectedOption: string;
  printedOption: string;

  model = new Clasificacion();
  clasi: String;
  itemsRef: AngularFireList<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile = null;
  heroForm: FormGroup;
  profileUrl: Observable<string | null>;
  imageUrl: any;
  submitted = false;
  img1sub = false;
  // Errores de imagen
  imgError1 = false;
  imgError2 = false;

  mensajeErrorImg1: string;
  mensajeErrorImg2: string;

  // subida de imagenes
  estadoCargaImg1 = false;
  estadoCargaImg2 = false;


  porcentajeCargaImg1: any;
  porcentajeCargaImg2: any;


  claseCargaImg1: any;
  claseCargaImg2: any;


  firebaseDB: any;




  empleadoActual: Empleado;
  constructor(db: AngularFireDatabase, private storage: AngularFireStorage, private location: Location,
      private sessionService: SessionServiceService, private router: Router) {
    this.haySesion();
    this.itemsRef = db.list('clasificaciones');
    this.firebaseDB = db;


   }

  ngOnInit(): void {

  }
  haySesion() {
    if (this.sessionService.empleado !== undefined) {
      // hay sesion
      this.empleadoActual = this.sessionService.empleado;
    } else {

        // this.router.navigate(['/login']);
    }
  }

  newHero() {

    this.model.nombreBusqueda = this.quitarCaracteresEspeciales(this.model.nombre);
    this.model.fechaCreacion = new Date().getTime();
    // this.model.empleadoAlta = this.sessionService.empleado.key;

    this.validarInfo();



    this.itemsRef.push(this.model);
    // this.model.clasificaciones.clasificacion1 = this.selectedOption;
    // this.uploadFile();
    this.submitted = true;
    window.scroll(0, 0);
   }

   quitarCaracteresEspeciales( input: string): string {
    const tittles = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';

    for (let i = 0; i < tittles.length; i++) {
        input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
    }
    return input;

   }


   getFile(event) {
    this.imgError1 = false;
    this.imgError2 = false;

    this.selectedFile = event.target.files[0];
    let ancho = 0;
      let alto = 0;
    console.log(event.target.id);
    if (event.target.id === 'file1') {
      ancho = 270;
      alto = 318;
    } else if (event.target.id === 'file2') {
      ancho = 870;
      alto = 294;
    }
    // this.uploadFile();
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg') {
        console.log(event.target.files[0]);
        if (event.target.files[0].size < alto * ancho) {// Checking height * width}
          console.log('tamaño válida');
          // this.selectedFile.push(event.target.id = { tevent.target.files[0]});
          // console.log(this.selectedFile);
          if (event.target.files[0].size < 2000000) {//
            console.log('peso válido');
            this.uploadFile(event.target.id);
          } else {
            // Peso inválido
            switch (event.target.id) {
              case 'file1':
              this.mensajeErrorImg1 = 'Imagen demasiado grande. Debe pesar menos de ';
              this.imgError1 = true;
              break;
              case 'file2':
              this.mensajeErrorImg2 = 'Imagen demasiado grande. Debe pesar menos de ';
              this.imgError2 = true;
              break;
            }
            console.log('peso inválido');
          }
        } else {
          // Tamaño inválido
          switch (event.target.id) {
            case 'file1':
            this.mensajeErrorImg1 = 'Tamaño inválido. Debe medir ' + ancho + ' px de ancho por ' + alto + ' px de alto';
            this.imgError1 = true;
            break;
            case 'file2':
            this.mensajeErrorImg2 = 'Tamaño inválido. Debe medir ' + ancho + ' px de ancho por ' + alto + ' px de alto';
            this.imgError2 = true;
            break;
          }
          console.log('tamaño inválido');
        }
      } else {
        // No es imagen
        switch (event.target.id) {
          case 'file1':
          this.mensajeErrorImg1 = 'Formato no válido, debe ser una imagen en .jpg o .png';
          this.imgError1 = true;
          break;
          case 'file2':
          this.mensajeErrorImg2 = 'Formato no válido, debe ser una imagen en .jpg o .png';
          this.imgError2 = true;
          break;
        }
        console.log('No imagen');
        // alert('Error');
        // event.srcElement.value = '';

      }
    }
   }
   uploadFile(nombreImagen: string) {

    // Activo proceso de carga
    switch (nombreImagen) {
      case 'file1':
      this.estadoCargaImg1 = true;
      this.claseCargaImg1 = 'progress-bar progress-bar-primary progress-bar-striped';
      break;
      case 'file2':
      this.estadoCargaImg2 = true;
      this.claseCargaImg2 = 'progress-bar progress-bar-primary progress-bar-striped';
      break;
    }
    const file = this.selectedFile;
    const filePath = 'prueba/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(n => {
      switch (nombreImagen) {
        case 'file1':
        this.porcentajeCargaImg1 = n;
        break;
        case 'file2':
        this.porcentajeCargaImg2 = n;
        break;
      }
      console.log(n);
    });
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(
          url => {
            this.imageUrl = url;
            console.log(url);

            switch (nombreImagen) {
              case 'file1':
              this.model.imagenClasificaciones = url;
              this.claseCargaImg1 = 'progress-bar progress-bar-success';
              break;
              case 'file2':
               this.model.imagenTitulo = url;
               this.claseCargaImg2 = 'progress-bar progress-bar-success';
              break;
            }
          }
          );
        }
      )
   )
    .subscribe(
        x => console.log(fileRef.getDownloadURL));
      this.getUrl(filePath);
  }
  getUrl(filePath: string) {
    const ref = this.storage.ref(filePath);
    this.profileUrl = ref.getDownloadURL();
    console.log(this.profileUrl);
  }
  get nombre() {return this.heroForm.get('nombre'); }
  cancel() {
    this.location.back();
  }

  validarInfo() {
    if (this.model.nombre === undefined) {
      this.model.nombre = '-';

    }
    if (this.model.imagenTitulo === undefined) {
      this.model.imagenTitulo = '-';

    }
    if (this.model.imagenClasificaciones === undefined) {
      this.model.imagenClasificaciones = '-';

    }
    if (this.model.descripcion === undefined) {
      this.model.descripcion = '-';

    }
    if (this.model.fechaCreacion === undefined) {
      this.model.fechaCreacion = 0 ;

    }
    if (this.model.empleadoAlta === undefined) {
      this.model.empleadoAlta = '-';

    }


  }

}

