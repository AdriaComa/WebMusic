import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioVerDetalleService } from '../servicio-ver-detalle.service';


import { Cancion, CancionesService } from '../servicios/canciones.service';
import { debounceTime } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detalleCancion',
  templateUrl: './detalleCancion.component.html',
  styleUrls: ['./detalleCancion.component.css']
})

export class detalleCancionComponent {

  canciones: Cancion[] = [];
  cancion: Cancion | undefined;
  public cancionBD: Observable<any> | undefined;




  artist: any;
  title: string | undefined;
  albums: any;
  style: string | undefined;
  date: string | undefined;
  description: string | undefined;


  id_song = new FormControl('', [Validators.required]);
  artista = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  album = new FormControl('', [Validators.required]);
  estilo = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);




  constructor(private activatedRoute: ActivatedRoute,
    private _cancionesService: CancionesService,
    private router: Router,
    private servicioDetalle: ServicioVerDetalleService,
    private afs: AngularFirestore






  ) {

    this.id_song.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) }),
      this.artista.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) }),
      this.titulo.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) }),
      this.album.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) }),
      this.estilo.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) }),
      this.fecha.valueChanges.pipe(debounceTime(500)).subscribe(value => { console.log(value) })


  }

  ngOnInit() {

    this.servicioDetalle.disparadorDetalle.subscribe(data => {
      console.log("HOLI");
      console.log(data);
      this.cancion = data;
      console.log("This: ", this.cancion)
    })

  }

  updateCancion(id: string) {

    //seleccionamos de la base de datos la canción con el ID que recibimos por parámetro
    let cancion = this.afs.doc<any>("canciones/" + id);
    console.log(this.artist,"dsjfsjlfsoi")
    console.log("ID del documento:", id);
    console.log("Datos enviados a la función:", );


    console.log(cancion)

    this.afs.doc('canciones/' + id).update({
      Artista: this?.artist,
      Album: this?.albums,
      Titulo: this?.title,

    });



    //console.log("Datos enviados a la función:", album, artist, title);


    //Seleccionamos los datos de Firebase y los convertimos a objeto Canción
    cancion.valueChanges().subscribe(res => {


      //EN ESTE CONSOLE LOG LA IDEA ES QUE APAREZCAN LAS DOS, el artista inicial y luego el nombre modificado en el formulario
      //(Se supone que lo pasa por parámetro al hacer click, pero me está mostrando lo mismo). Una vez consiga tener esa diferencia,
      //será hacer un update de la "cancion" con los datos del formulario.
      console.log("Artista:erderrerererererer ", res.Artista, this.artist);
    });


    // this.afs.doc('canciones/'+id).update({
    //   Artista: artist,
    //   Titulo: title,
    //   Album: album,
    // })

  }

  updateSong(artist: string,) {
    // Obtén los valores actuales de los campos de la forma
    const artista = this.artista// ...
    const title = this.title// ...
    const albums = this.albums// ...
    const style = this.style// ...
    const date = this.date// ...
    const description = this.description// ...

    // Actualiza la canción en la base de datos

    console.log("this.cancion", this.cancion)

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
    this.artista.setValue('');
  }

  getTitulo(event: Event) {
    event.preventDefault();
    console.log(this.titulo.value);
  }

  updateTitulo() {
    this.titulo.setValue('');
  }

  getAlbum(event: Event) {
    event.preventDefault();
    console.log(this.album.value);
  }

  updateAlbum() {
    this.album.setValue('');
  }

  getEstilo(event: Event) {
    event.preventDefault();
    console.log(this.estilo.value);
  }

  updateEstilo() {
    this.album.setValue('');
  }

  getFecha(event: Event) {
    event.preventDefault();
    console.log(this.fecha.value);
  }

  updateFecha() {
    this.fecha.setValue('');
  }


}

