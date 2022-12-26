import { NgModule } from '@angular/core';

import { Component, OnInit, } from '@angular/core';

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
import { Inject, Injectable } from '@angular/core';






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





    //this.items = firestore.collection('canciones').valueChanges();


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

    console.log(this.afs.doc<any>('canciones/' + id).valueChanges())
    console.log(this.afs.doc<any>("canciones/" + id));
    const cancion = this.afs.doc<any>("canciones/" + id);
    ;
    this.cancion = [

        {id: '',
        titulo: "",
        artista: "",
        img: "",
        estilo:"",
        fecha: "",
        album: "",
        url: "",
        description:"",
        duration:""}
    ]

    cancion.valueChanges().subscribe(res => {

      this.cancion.album = res.Album;
      this.cancion.artista = res.Artista;
      this.cancion.estilo = res.Estilo;
      this.cancion.titulo = res.Titulo;
      this.cancion.fecha = res.Fecha;
      this.cancion.description = res.Descripcion;
      this.cancion.img = res.img;

      this.servicioDetalle.disparadorDetalle.emit(this.cancion);
      
    })

  }



  reproducirCancion(id: string) {
    this.cancion = this.canciones.find(cancion => cancion.id === id);
    this.servicioReproducirCancion.reproducirCancionTrigger.emit(this.cancion);
  }

}


