import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Empleado } from 'src/app/intefaces/empleado.interface';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';
import { Talla } from '../../intefaces/talla.interface';

@Component({
  selector: 'app-nueva-talla',
  templateUrl: './nueva-talla.component.html',
  styleUrls: ['./nueva-talla.component.css']
})
export class NuevaTallaComponent implements OnInit {

  selectedOption: string;
  printedOption: string;

  model = new Talla();
  clasi: String;
  itemsRef: AngularFireList<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile = null;
  heroForm: FormGroup;
  profileUrl: Observable<string | null>;
  imageUrl: any;
  submitted = false;





  empleadoActual: Empleado;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private location: Location,
      private sessionService: SessionServiceService, private router: Router) {
    this.haySesion();
    this.itemsRef = db.list('tallas');



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

  crearElemento() {

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

  cancel() {
    this.location.back();
  }

  validarInfo() {
    if (this.model.nombre === undefined) {
      this.model.nombre = '-';

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

