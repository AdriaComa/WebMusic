import { Component, OnInit } from '@angular/core';
import { CancionesService, Cancion } from '../servicios/canciones.service';
import { ServicioVerDetalleService } from "../servicio-ver-detalle.service";
import { ServicioReproducirCancion } from '../servicios/servicio-reproducir-cancion.service';
import { FiltrosServicioService } from '../filtros-servicio.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormGroup, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-listaCanciones',
  templateUrl: './listaCanciones.component.html',
  styleUrls: ['./listaCanciones.component.css'],
})


export class CancionComponent implements OnInit {

  canciones: Cancion[] = [];
  cancion: Cancion | undefined;
  value = 'filtroCanciones';


  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  filtroCanciones = '';

  constructor(firestore: AngularFirestore,
    private afs: AngularFirestore,
    private _cancionesService: CancionesService,
    private filtrosServicio: FiltrosServicioService,
    private servicioDetalle: ServicioVerDetalleService,
    private servicioReproducirCancion: ServicioReproducirCancion) {
    this.itemsCollection = afs.collection<any>('canciones');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
    //this.items = firestore.collection('canciones').valueChanges();


  }



  addItem(Titulo: string) {
    // Persist a document id
    const id = this.afs.createId();
    const cancion: any = { id, Titulo };
    this.itemsCollection.doc(id).set(cancion);
    console.log("ADD ITEMS: ")
    console.log(this.items);
    console.log("ADD ITEMS COLLECTION: ")
    console.log(this.itemsCollection.valueChanges());
  }

  borrarCancion(cancion_id: string) {
    console.log("BORRAR: ", cancion_id)
    const db = this.afs.firestore
    var jobskill_query = db.collection('canciones').where('id','==', cancion_id);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }


  ngOnInit() {


    this.canciones = this._cancionesService.getCanciones();

    this.filtrosServicio.disparadorFiltroArtista.subscribe(data => {
      this.getCancionesFiltradasArtista(data);
      console.log(data)
    })

    this.filtrosServicio.disparadorFiltroTexto.subscribe(data => {
      this.getCancionesFiltradasTexto(data);
      console.log(data)
    })

    this.filtrosServicio.disparadorFiltroEstilo.subscribe(data => {
      console.log(data)
      this.getCancionesFiltradasEstilo(data);
    })


  }

  public getCancionesFiltradasTexto(busqueda: string) {
    if (busqueda == "") {
      this.canciones = this._cancionesService.getCanciones();
    } else {
      this.canciones = this._cancionesService.getCanciones().filter(cancion => cancion.titulo.toLowerCase() == busqueda.toLowerCase());
    }
  }

  public getCancionesFiltradasArtista(busqueda: string) {
    if (busqueda == "") {
      this.canciones = this._cancionesService.getCanciones();
    } else {
      this.canciones = this._cancionesService.getCanciones().filter(cancion => cancion.artista.toLowerCase() == busqueda.toLowerCase());
    }
  }

  public getCancionesFiltradasEstilo(estilo: string) {

    console.log("ENTRA AQUI")

    switch (estilo) {
      case "Electrónica":
        this.canciones = this._cancionesService.getCanciones().filter(cancion => cancion.estilo == estilo);
        break;
      case "Pop":
        this.canciones = this._cancionesService.getCanciones().filter(cancion => cancion.estilo == estilo);
        break;
      case "Alternativa":
        this.canciones = this._cancionesService.getCanciones().filter(cancion => cancion.estilo == estilo);
        break;
      case "Todas":
        this.canciones = this._cancionesService.getCanciones();
        break;
      default:
        this.canciones = [];
        break;
    }
  }


  verDetalle(id: number) {
    this.cancion = this.canciones.find(cancion => cancion.id === id);
    let id_cancion = this.cancion?.id;
    console.log("TEST" + id_cancion);

    this.servicioDetalle.disparadorDetalle.emit(this.cancion);
  }

  reproducirCancion(id: number) {
    this.cancion = this.canciones.find(cancion => cancion.id === id);
    this.servicioReproducirCancion.reproducirCancionTrigger.emit(this.cancion);
  }

}


