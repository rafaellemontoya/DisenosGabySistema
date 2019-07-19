import { Talla } from './talla.interface';



export class Producto  {
    key: string;
    nombre: string;
    nombreBusqueda: string;
    imagen1: string;
    imagen2: string;
    imagen3: string;
    imagen4: string;
    imagen5: string;
    descripcion: string;
    promocionTodos: number;
    clasificaciones = {
        clasificacion1: '',
        clasificacion2: '',
        clasificacion3: '',
        clasificacion4: '',
        clasificacion5: ''
    };
    precioArchivo: Map<string, any> ;
    archivoLocalizacion: string;

    costoArchivo: number;
    precioMolde: number;
    costoMolde: number;
    unidadesMolde: number;
    precioMoldeImpreso: number;
    costoMoldeImpreso: number;
    unidadesMoldeImpreso: number;
    precioMuestra: number;
    costoMuestra: number;
    unidadesMuestra: number;
    fechaAlta: number;
    empleadoAlta: string;
    ediciciones: '-';





}
