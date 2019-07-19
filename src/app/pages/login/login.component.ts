import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/intefaces/empleado.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  itemPedido: Observable<any[]>;
  empleado: Empleado;
  noEmpleado = false;
  errorAutenticacion = false;
  mensajeErrorAutenticacion = '';
  constructor(private firebaseDB: AngularFireDatabase, private router: Router,
               private sessionService: SessionServiceService, private location: Location, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  makeLogin() {

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((success) => {
      console.log(success.user.getIdToken);
      this.getUserInfo(success.user.uid);

    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

        // alert(errorMessage);
        console.log(errorCode);
        switch (errorCode) {
          case 'auth/invalid-email':
            this.mensajeErrorAutenticacion = 'Email no válido';
            break;
            case 'auth/weak-password':
            this.mensajeErrorAutenticacion = 'La contraseña debe ser de 6 o más caracteres';
            break;
            case 'auth/user-not-found':
            this.mensajeErrorAutenticacion = 'Email no encontrado';
            break;
            case 'auth/wrong-password':
            this.mensajeErrorAutenticacion = 'Contraseña incorrecta';
            break;
        }

      console.log(error);
    });


    // this.itemPedido = this.firebaseDB.list('/empleados',
    // ref => ref.orderByChild('usuario').equalTo(this.email)).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({

    //       key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

    // // subscribe to changes
    // this.itemPedido.subscribe(queriedItems => {
    //   if (queriedItems[0].usuario === this.email && queriedItems[0].password === this.password) {
    //     this.sessionService.setCurrentUser(queriedItems[0].key, queriedItems[0]);
    //     this.empleado = queriedItems[0];
    //     this.sessionService.empleado = queriedItems[0];
    //     this.sessionService.keyEmpleado = queriedItems[0].key;

    //     this.router.navigate(['/inicio']);

    //   }
    // });
  }


  getUserInfo(keyUser: string) {
    this.firebaseDB.list('/empleados', ref => ref.orderByKey().equalTo(keyUser)).valueChanges().subscribe(clienteFireb => {

      let clienteBD: any;
      clienteBD = clienteFireb;
      const empleado = new Empleado();
      empleado.key = keyUser;
      empleado.nombre = this.revisarUndefined(clienteBD[0].nombre);
      empleado.foto = this.revisarUndefined(clienteBD[0].foto);
      empleado.email = this.revisarUndefined(clienteBD[0].email);
      empleado.telefono = this.revisarUndefined(clienteBD[0].telefono);
      empleado.tipoUsuario = this.revisarUndefined(clienteBD[0].tipoUsuario);
      empleado.permisos.ventas = this.revisarUndefined(clienteBD[0].permisos.ventas);
      empleado.permisos.productos = this.revisarUndefined(clienteBD[0].permisos.productos);
      empleado.permisos.clasificaciones = this.revisarUndefined(clienteBD[0].permisos.clasificaciones);
      empleado.permisos.estadisticas = this.revisarUndefined(clienteBD[0].permisos.estadisticas);
      empleado.permisos.tallas = this.revisarUndefined(clienteBD[0].permisos.tallas);
      empleado.permisos.empleados = this.revisarUndefined(clienteBD[0].permisos.empleados);

      if (empleado.tipoUsuario !== 2) {
        this.noEmpleado = true;
        this.afAuth.auth.signOut();
      } else if (empleado.tipoUsuario === 2) {
        this.sessionService.setCurrentUser(empleado.key, empleado);
        this.sessionService.empleado = empleado;
        this.sessionService.keyEmpleado = empleado.key;
        this.router.navigate(['/inicio']);
      }


    }) ;
  }
  revisarUndefined(elemento: any) {
    if ( elemento !== undefined) {
      return elemento;
    } else {
      return '';
    }
  }

  errores(codigo: string) {
    console.log(codigo);
    switch (codigo) {
      case 'auth/invalid-email':
        this.mensajeErrorAutenticacion = 'Email no válido';
        break;
        case 'auth/weak-password':
        this.mensajeErrorAutenticacion = 'La contraseña debe ser de 6 o más caracteres';
        break;
        case 'auth/user-not-found':
        this.mensajeErrorAutenticacion = 'Email no encontrado';
        break;
        case 'auth/wrong-password':
        this.mensajeErrorAutenticacion = 'Contraseña incorrecta';
        break;
    }

  }

}
