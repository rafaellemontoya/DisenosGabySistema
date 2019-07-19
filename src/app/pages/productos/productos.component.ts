import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Producto } from '../../intefaces/producto.interface';
import { map } from 'rxjs/operators';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/intefaces/empleado.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  items: Observable<any[]>;
  model = new Producto();
  itemsProductosRef: AngularFireList<any>;
  itemsProductos: Observable<any[]>;
  firebaseDB: any;
  empleadoActual: Empleado;

  constructor(db: AngularFireDatabase, private sessionService: SessionServiceService, private router: Router) {
    this.haySesion();
    this.firebaseDB = db;
    this.getProductos();
    this.items = db.list('productos').valueChanges();


   }
   getProductos() {
    this.itemsProductosRef = this.firebaseDB.list('productos');
    this.itemsProductos = this.itemsProductosRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val() }))
      )
    );
      // aquí se ven los resultados de cada query
this.itemsProductos.subscribe(item => {console.log(item); });
}


  ngOnInit() {
  }
  haySesion() {
    if (this.sessionService.empleado !== undefined) {
      // hay sesion
      this.empleadoActual = this.sessionService.empleado;
    } else {

        this.router.navigate(['/login']);
    }
  }
  onSubmit() {
    console.log(this.model.nombre);
   }
}
