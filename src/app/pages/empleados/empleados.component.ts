import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Empleado } from 'src/app/intefaces/empleado.interface';

import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Observable<any[]>;
  empleadoActual: Empleado;
  // eliminar
  preguntaEliminar = false;
  empleadoSeleccionado = new Empleado();
  eliminarExitoso = false;
  // fin eliminar
  constructor(private firebaseDB: AngularFireDatabase, private sessionService: SessionServiceService, private router: Router,
     private location: Location
    ) {
    this.haySesion();
   }

  ngOnInit() {
    this.getEmpleados();
  }
  haySesion() {
    if (this.sessionService.empleado !== undefined) {
      // hay sesion
      this.empleadoActual = this.sessionService.empleado;
      console.log(this.empleadoActual.permisos.empleados)
    } else {

        this.router.navigate(['/login']);
    }
  }
  getEmpleados() {

    this.empleados = this.firebaseDB.list('empleados').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val() }))
      )
    );
      // aquí se ven los resultados de cada query
this.empleados.subscribe(item => {});
  }

  atras() {
    this.location.back();

  }

  // Eliminar
  eliminarEntrada(keyEmpleado: string) {

    this.eliminarExitoso = true;
    this.preguntaEliminar = false;


    const itemsRef = this.firebaseDB.list('empleados');
    if (keyEmpleado !== '') {

      itemsRef.remove(keyEmpleado);
    }


   }
   preguntarEliminar(empleado: Empleado) {
    window.scroll(0, 0);
    this.preguntaEliminar = true;
    this.eliminarExitoso = false;
    this.empleadoSeleccionado = empleado;
   }
   cancelarEliminar() {
    this.preguntaEliminar = false;
    this.empleadoSeleccionado = new Empleado();
   }
   terminarEliminar() {
    this.eliminarExitoso = false;
   }

   // Fin Eliminar
}
