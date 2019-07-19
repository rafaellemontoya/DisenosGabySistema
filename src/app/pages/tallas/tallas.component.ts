import { Component, OnInit } from '@angular/core';
import { Clasificacion } from '../../intefaces/clasificacion.interface';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/intefaces/empleado.interface';
import { Location } from '@angular/common';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Talla } from 'src/app/intefaces/talla.interface';


@Component({
  selector: 'app-tallas',
  templateUrl: './tallas.component.html',
  styleUrls: ['./tallas.component.css']
})
export class TallasComponent implements OnInit {

  empleadoActual: Empleado;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
    // eliminar
    preguntaEliminar = false;
    elementoSeleccionado = new Talla();
    eliminarExitoso = false;
    // fin eliminar

  constructor(private location: Location, private db: AngularFireDatabase) {
    this.empleadoActual = new Empleado();
this.empleadoActual.permisos.tallas = true;
   }

  ngOnInit() {
    this.cargarElementos();
  }

  atras() {
    this.location.back();

  }

  cargarElementos() {
    this.itemsRef = this.db.list('tallas');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val() }))
      )
    );
      // aquí se ven los resultados de cada query
this.items.subscribe(item => {console.log(item); });
}
  buscar($event) {
    const first: string = $event.target.value;
    console.log(first);

      this.itemsRef = this.db.list('tallas');
      this.items = this.itemsRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload.key, ...c.payload.val() }))
            .filter( (item: any) => item.nombreBusqueda.includes(first.toLowerCase())  )
        )
      );
        // aquí se ven los resultados de cada query
      this.items.subscribe();

  }

  // Eliminar
  eliminarEntrada(keySeleccionado: string) {

    this.eliminarExitoso = true;
    this.preguntaEliminar = false;


    const itemsRef = this.db.list('tallas');
    if (keySeleccionado !== '') {

      itemsRef.remove(keySeleccionado);
    }


   }
   preguntarEliminar(seleccionado: Talla) {
    window.scroll(0, 0);
    this.preguntaEliminar = true;
    this.eliminarExitoso = false;
    this.elementoSeleccionado = seleccionado;
   }
   cancelarEliminar() {
    this.preguntaEliminar = false;
    this.elementoSeleccionado = new Talla();
   }
   terminarEliminar() {
    this.eliminarExitoso = false;
   }

   // Fin Eliminar

  }


