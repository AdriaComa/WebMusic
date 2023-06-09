import { NgModule } from '@angular/core';

import { Component, OnInit, } from '@angular/core';

import { CancionesService, Cancion } from '../servicios/canciones.service';
import { ServicioVerDetalleService } from "../servicio-ver-detalle.service";
import { ServicioReproducirCancion } from '../servicios/servicio-reproducir-cancion.service';
import { FiltrosServicioService } from '../filtros-servicio.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';


@Component({
  selector: 'app-listaCanciones',
  templateUrl: './listaCanciones.component.html',
  styleUrls: ['./listaCanciones.component.css'],
})


export class CancionComponent implements OnInit {


  canciones: Cancion[] = [];
  cancion: Cancion | any;

  value = 'filtroCanciones';



  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any>;

  filtroCanciones: string = '';

  constructor(firestore: AngularFirestore,
    private afs: AngularFirestore,
    private _cancionesService: CancionesService,
    private filtrosServicio: FiltrosServicioService,
    private servicioDetalle: ServicioVerDetalleService,
    private servicioReproducirCancion: ServicioReproducirCancion,) {
    this.itemsCollection = afs.collection<any>('canciones');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }

  borrarCancion(cancion_id: string) {
    console.log("BORRAR: ", cancion_id)
    const db = this.afs.firestore
    var jobskill_query = db.collection('canciones').where('id', '==', cancion_id);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
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

  // FILTRO CON LA BBDD DE FIREBASE
  public getCancionesFiltradasEstilo(estilo: string) {
    const db = this.afs.collection<any>('canciones', ref => ref.where('Estilo', '==', estilo));
    this.items = db.valueChanges();
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



  getCancion(id: string) {

    //Creamos esta canción en blanco para que no dé como variable undefined.
    this.cancion = [
      {
        id: '',
        titulo: "",
        artista: "",
        img: "",
        estilo: "",
        fecha: "",
        album: "",
        url: "",
        description: "",
        duration: ""
      }
    ]

    //seleccionamos de la base de datos la canción con el ID que recibimos por parámetro
    const cancion = this.afs.doc<any>("canciones/" + id);

    //Seleccionamos los datos de Firebase y los convertimos a objeto Canción
    cancion.valueChanges().subscribe(res => {

      this.cancion.id = res.id;
      this.cancion.album = res.Album;
      this.cancion.artista = res.Artista;
      this.cancion.estilo = res.Estilo;
      this.cancion.titulo = res.Titulo;
      this.cancion.fecha = res.Fecha;
      this.cancion.description = res.Descripcion;
      this.cancion.img = res.img;

      //Enviamos esta canción al Detalle mediante el servicio
      this.servicioDetalle.disparadorDetalle.emit(this.cancion);

    });

  }



  reproducirCancion(id: string) {

    console.log("ID: ", id)
    //Creamos esta canción en blanco para que no dé como variable undefined.
    this.cancion = [
      {
        id: id,
        titulo: "",
        artista: "",
        img: "",
        estilo: "",
        fecha: "",
        album: "",
        url: "",
        description: "",
        duration: ""
      }
    ]

    const cancion = this.afs.doc<any>("canciones/" + id);
    console.log("Cancion reproductirC(): ", cancion)

    cancion.valueChanges().subscribe(res => {
      this.cancion.url = res.url;
      console.log(this.cancion.url, "<- URL de Cancion ")
      console.log(this.cancion, "<--CANCION antes del emit")
      this.servicioReproducirCancion.reproducirCancionTrigger.emit(this.cancion);

    });

  }

}


