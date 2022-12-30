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


  }
}
