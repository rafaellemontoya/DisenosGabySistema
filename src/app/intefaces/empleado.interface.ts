export class Empleado {
    key: string;
    nombre: string;
    foto: string;
    email: string;
    password: string;
    telefono: string;
    tipoUsuario = 2;
    permisos = {
        ventas: false,
        productos: false,
        empleados: false,
        clasificaciones: false,
        estadisticas: false,
        tallas: false
    };
constructor() {
    this.permisos.ventas = false;
}



}
