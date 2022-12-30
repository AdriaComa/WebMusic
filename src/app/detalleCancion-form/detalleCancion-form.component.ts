import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'
import { list } from 'firebase/storage';

@Component({
  selector: 'app-detalleCancion-form',
  templateUrl: './detalleCancion-form.component.html',
  styleUrls: ['./detalleCancion-form.component.css']

})

export class DetalleCancionFormComponent implements OnInit {

  form: FormGroup = null!;

  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  public imgName = "";
  public imgURL = "";

  public mp3URL = "";

  constructor(firestore: AngularFirestore,
    private afs: AngularFirestore, private formBuilder: FormBuilder, private storage: Storage) {

    this.buildForm();

    this.itemsCollection = afs.collection<any>('canciones');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });

  }

  ngOnInit() {
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    let nombre = file.name.replace(/\s+/g, '')
    const imgRef = ref(this.storage, `covers/${nombre}`);
    uploadBytes(imgRef, file).then(async response => {
      console.log("Se acaba de subir con el nombre: ", nombre);
      this.getImages(nombre);
    }).catch(error => console.log(error));

  }

  getImages(name: string) {

    console.log("recibimos el nombre: ", name)

    const listRef = ref(this.storage, 'covers');
    const arrayURL = <any>[];
    let url_imagen = "";

    listAll(listRef).then(async response => {

      for (let item of response.items) {
        const url = await getDownloadURL(item);
        arrayURL.push(url);
      }

      const filteredArray = arrayURL.filter((url: string | string[]) => url.includes(name));
      console.log("Filtrado:", filteredArray);
      this.imgURL = filteredArray[0];

    }).catch(error => console.log(error));



  }

  uploadMP3($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    let nombre = file.name.replace(/\s+/g, '')
    const mp3Ref = ref(this.storage, `music/${nombre}`);
    uploadBytes(mp3Ref, file).then(async response => {
      console.log("Se acaba de subir MP3 con el nombre: ", nombre);
      this.getMP3(nombre);
    }).catch(error => console.log(error));

  }

  getMP3(name: string) {

    console.log("recibimos el MP3 nombre: ", name)

    const listRef = ref(this.storage, 'music');
    const arrayURL = <any>[];

    listAll(listRef).then(async response => {
      for (let item of response.items) {
        const url = await getDownloadURL(item);
        arrayURL.push(url);
      }

      const filteredArray = arrayURL.filter((url: string | string[]) => url.includes(name));
      console.log("Filtrado:", filteredArray);
      this.mp3URL = filteredArray[0];

    }).catch(error => console.log(error));

  }


  private buildForm() {
    this.form = this.formBuilder.group({
      artista: new FormControl(' ', [Validators.required]),
      titulo: new FormControl(' ', [Validators.required]),
      album: new FormControl(' ', [Validators.required]),
      fecha: new FormControl(' ', [Validators.required]),
      estilo: new FormControl(' ', [Validators.required]),
      description: new FormControl(' ', [Validators.required]),
    });
  }

  save(event: Event) {
    event.preventDefault();
    const img_url = this.imgURL;
    const mp3_url = this.mp3URL;
    console.log("En el formulario pasamos: ", img_url)
    if (this.form.valid) {
      const cancionForm = this.form.value;
      console.log("FORMULARIO: ", cancionForm);
      this.crearCancion(cancionForm.titulo, cancionForm.album, cancionForm.artista, cancionForm.fecha, cancionForm.estilo, cancionForm.description, img_url, mp3_url);
      this.form.reset()
      this.form.clearAsyncValidators();
    }
  }

  crearCancion(
    Titulo: string,
    Album: string,
    Artista: string,
    Fecha: string,
    Estilo: string,
    Descripcion: string,
    img: string,
    url: string,
  ) {
    // Persist a document id
    const id = this.afs.createId();
    const cancion: any = { id, Titulo, Album, Artista, Fecha, Estilo, Descripcion, img, url };
    this.itemsCollection.doc(id).set(cancion);
  }


}

