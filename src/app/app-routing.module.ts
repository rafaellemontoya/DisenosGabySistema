import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { NuevoProductoComponent } from './pages/nuevo-producto/nuevo-producto.component';
import { AdministrarInicioComponent } from './pages/administrar-inicio/administrar-inicio.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NuevoEmpleadoComponent } from './pages/nuevo-empleado/nuevo-empleado.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
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

const app_routes: Routes = [

    {path: '', component:  LoginComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'nuevo-producto', component: NuevoProductoComponent},
    {path: 'editar-producto/:id', component: EditarProductoComponent},
    {path: 'clasificaciones', component: ClasificacionesComponent},
    {path: 'nueva-clasificacion', component: NuevaClasificacionComponent},
    {path: 'editar-clasificacion/:id', component: EditarClasificacionComponent},
    {path: 'tallas', component: TallasComponent},
    {path: 'nueva-talla', component: NuevaTallaComponent},
    {path: 'ver-direccion/:id', component: VerDireccionEnvioComponent},
    {path: 'ver-venta/:id', component: VerVentaComponent},
    {path: 'historial-pedidos', component: HistorialPedidosComponent},
    {path: 'revisar-reportes', component: RevisarReportesComponent},
    {path: 'empleados', component: EmpleadosComponent},
    {path: 'nuevo-empleado', component: NuevoEmpleadoComponent},
    {path: 'editar-empleado/:id', component: EditarEmpleadoComponent},
    {path: 'ventas', component: VentasComponent},
    {path: 'envio/:id', component: EnvioComponent},
    {path: 'administrar-inicio', component: AdministrarInicioComponent},
    {path: 'estadisticas', component: EstadisticasComponent},
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent}
];
@NgModule({
    imports: [
        RouterModule.forRoot( app_routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
