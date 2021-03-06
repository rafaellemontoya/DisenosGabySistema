import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NuevoProductoComponent } from './pages/nuevo-producto/nuevo-producto.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { AdministrarInicioComponent } from './pages/administrar-inicio/administrar-inicio.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NuevoEmpleadoComponent } from './pages/nuevo-empleado/nuevo-empleado.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { VerDireccionEnvioComponent } from './pages/ver-direccion-envio/ver-direccion-envio.component';
import { VerVentaComponent } from './pages/ver-venta/ver-venta.component';
import { EnvioComponent } from './pages/envio/envio.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ClasificacionesComponent } from './pages/clasificaciones/clasificaciones.component';
import { NuevaClasificacionComponent } from './pages/nueva-clasificacion/nueva-clasificacion.component';
import { EditarClasificacionComponent } from './pages/editar-clasificacion/editar-clasificacion.component';
import { TallasComponent } from './pages/tallas/tallas.component';
import { NuevaTallaComponent } from './pages/nueva-talla/nueva-talla.component';
import { RevisarReportesComponent } from './pages/revisar-reportes/revisar-reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    AdministrarInicioComponent,
    EmpleadosComponent,
    NuevoEmpleadoComponent,
    VentasComponent,
    VerDireccionEnvioComponent,
    VerVentaComponent,
    EnvioComponent,
    LoginComponent,
    InicioComponent,
    EditarEmpleadoComponent,
    HistorialPedidosComponent,
    EstadisticasComponent,
    ClasificacionesComponent,
    NuevaClasificacionComponent,
    EditarClasificacionComponent,
    TallasComponent,
    NuevaTallaComponent,
    RevisarReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase, AngularFireStorageModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
