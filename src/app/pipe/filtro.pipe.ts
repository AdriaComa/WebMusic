import { Pipe, PipeTransform } from "@angular/core";
import { Cancion } from '../servicios/canciones.service';

@Pipe ({
  name: 'filtro',
})

export class FiltroCancionesPipe implements PipeTransform {

  transform (items:any[],filtro:string): any {
    if (!items) {
      return [];
    }
    if (!filtro) {
      return items;
    }

    filtro = filtro.toLowerCase();

    return items.filter(item => {
      return item.Titulo.toLowerCase().includes(filtro) || item.Artista.toLowerCase().includes(filtro);
    });





    // if (args === '' || args.length < 3) return value;
    // const result = [];
    // for (const cancion of value){
    //   if (cancion.artista.toLowerCase().indexOf(args.toLowerCase()) > -1) {
    //     result.push(cancion);
    //   };
    // };
    // for (const cancion of value){
    //   if (cancion.titulo.toLowerCase().indexOf(args.toLowerCase()) > -1) {
    //     result.push(cancion);
    //   };
    // };
    // return result;



  }
}
