import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hayUser = true;

  constructor(private sessionService: SessionServiceService, private router: Router) { }

  ngOnInit() {

  }

  getSession() {
    this.sessionService.getCurrentEmpleado2().subscribe(empleado => {


      return empleado;
    });



  }

  getNombreEmpleado() {
    this.sessionService.getCurrentEmpleado2().subscribe(empleado => {

      if (this.sessionService.keyEmpleado !== undefined) {

        return this.sessionService.empleado.nombre;
      } else {
        return '';
      }


    });

  }
  getImagenEmpleado() {
    if (this.sessionService.keyEmpleado !== undefined) {
      this.hayUser = true;
      return this.sessionService.empleado.foto;


    } else {
      return '';

    }
  }
  logout() {

    this.hayUser = false;
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
