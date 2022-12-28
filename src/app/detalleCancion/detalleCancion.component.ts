import { identifierName } from '@angular/compiler';
import {Component} from '@angular/core'
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioVerDetalleService } from '../servicio-ver-detalle.service';


import { Cancion, CancionesService } from '../servicios/canciones.service';
import { debounceTime } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component ({
  selector: 'app-detalleCancion',
  templateUrl: './detalleCancion.component.html',
  styleUrls: ['./detalleCancion.component.css']
})

export class detalleCancionComponent {

  canciones:Cancion[] = [];
  cancion: Cancion | undefined;






  artist: any;
  title: any;
  albums: any;
  style: string | undefined;
  date: string | undefined;
  description: string | undefined;


  artista = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  album = new FormControl('', [Validators.required]);
  estilo = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);




  constructor(  private activatedRoute: ActivatedRoute,
                private _cancionesService: CancionesService,
                private router: Router,
                private servicioDetalle: ServicioVerDetalleService,
                private afs: AngularFirestore,






    ) {

      this.artista.valueChanges.pipe(debounceTime(500)).subscribe(value=>{console.log(value)}),
      this.titulo.valueChanges.pipe(debounceTime(500)).subscribe(value=>{console.log(value)}),
      this.album.valueChanges.pipe(debounceTime(500)).subscribe(value=>{console.log(value)}),
      this.estilo.valueChanges.pipe(debounceTime(500)).subscribe(value=>{console.log(value)}),
      this.fecha.valueChanges.pipe(debounceTime(500)).subscribe(value=>{console.log(value)})


    }

    ngOnInit() {

      this.servicioDetalle.disparadorDetalle.subscribe(data => {
        console.log("HOLI");
        console.log(data);
        this.cancion = data;
        // console.log(this.cancion, "asdasd");
      })

    }

    updateCancion(album:string, artist:string, title:string){
      this.afs.doc('canciones/').update({
        artist: artist,
        title: title,
        albums: album,
      })

    }

    updateSong(artist: string, ){
      // Obtén los valores actuales de los campos de la forma
  const artista = this.artista// ...
  const title =  this.title// ...
  const albums = this.albums// ...
  const style = this.style// ...
  const date = this.date// ...
  const description = this.description// ...

  // Actualiza la canción en la base de datos
  this.afs.doc('canciones/' + this.cancion).update({
    artist: artista,
    title: title,
    album: albums,
    style: style,
    date: date,
    description: description,
  });
    }

    getArtista(event: Event) {
      event.preventDefault();
      console.log(this.artista.value);
    }

    updateArtista() {
      this.artista.setValue( '' );
    }

    getTitulo(event: Event) {
      event.preventDefault();
      console.log(this.titulo.value);
    }

    updateTitulo() {
      this.titulo.setValue( '' );
    }

    getAlbum(event: Event) {
      event.preventDefault();
      console.log(this.album.value);
    }

    updateAlbum() {
      this.album.setValue( '' );
    }

    getEstilo(event: Event) {
      event.preventDefault();
      console.log(this.estilo.value);
    }

    updateEstilo() {
      this.album.setValue( '' );
    }

    getFecha(event: Event) {
      event.preventDefault();
      console.log(this.fecha.value);
    }

    updateFecha() {
      this.fecha.setValue( '' );
    }


  }

