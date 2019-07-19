import { Component, OnInit } from '@angular/core';
import { Clasificacion } from '../../intefaces/clasificacion.interface';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/intefaces/empleado.interface';
import { Location } from '@angular/common';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.component.html',
  styleUrls: ['./clasificaciones.component.css']
})
export class ClasificacionesComponent implements OnInit {


  empleadoActual: Empleado;

  itemsClasificacionesRef: AngularFireList<any>;
  itemsClasificaciones: Observable<any[]>;
    // eliminar
    preguntaEliminar = false;
    elementoSeleccionado = new Clasificacion();
    eliminarExitoso = false;
    // fin eliminar

  constructor(private location: Location, private db: AngularFireDatabase) {
    this.empleadoActual = new Empleado();
this.empleadoActual.permisos.clasificaciones = true;
   }

  ngOnInit() {
    this.cargarClasificaciones();
  }

  atras() {
    this.location.back();

  }

  cargarClasificaciones() {
    this.itemsClasificacionesRef = this.db.list('clasificaciones');
    this.itemsClasificaciones = this.itemsClasificacionesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val() }))
      )
    );
      // aquí se ven los resultados de cada query
this.itemsClasificaciones.subscribe(item => {console.log(item); });
}
  buscar($event) {
    const first: string = $event.target.value;
    console.log(first);

      this.itemsClasificacionesRef = this.db.list('clasificaciones');
      this.itemsClasificaciones = this.itemsClasificacionesRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload.key, ...c.payload.val() }))
            .filter( (item: any) => item.nombreBusqueda.includes(first.toLowerCase())  )
        )
      );
        // aquí se ven los resultados de cada query
      this.itemsClasificaciones.subscribe();

  }

  // Eliminar
  eliminarEntrada(keySeleccionado: string) {

    this.eliminarExitoso = true;
    this.preguntaEliminar = false;


    const itemsRef = this.db.list('clasificaciones');
    if (keySeleccionado !== '') {

      itemsRef.remove(keySeleccionado);
    }


   }
   preguntarEliminar(seleccionado: Clasificacion) {
    window.scroll(0, 0);
    this.preguntaEliminar = true;
    this.eliminarExitoso = false;
    this.elementoSeleccionado = seleccionado;
   }
   cancelarEliminar() {
    this.preguntaEliminar = false;
    this.elementoSeleccionado = new Clasificacion();
   }
   terminarEliminar() {
    this.eliminarExitoso = false;
   }

   // Fin Eliminar

  }


