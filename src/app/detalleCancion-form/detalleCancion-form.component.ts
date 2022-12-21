import {Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators, Form } from '@angular/forms';
import { debounceTime} from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component ({
  selector: 'app-detalleCancion-form',
  templateUrl: './detalleCancion-form.component.html',
  styleUrls: ['./detalleCancion-form.component.css']

})

export class DetalleCancionFormComponent implements OnInit {

  form: FormGroup = null!;
  
  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  constructor( firestore: AngularFirestore,
    private afs: AngularFirestore, private formBuilder: FormBuilder  ){

    this.buildForm();

    this.itemsCollection = afs.collection<any>('canciones');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });

  }

  ngOnInit() {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      artista: new FormControl(' ', [Validators.required]),
      titulo: new FormControl(' ', [Validators.required]),
      album: new FormControl(' ', [Validators.required]),
      fecha: new FormControl(' ', [Validators.required]),
      estilo: new FormControl(' ', [Validators.required]),
    });
  }

  save(event: Event) {
    event.preventDefault();
    if(this.form.valid){
      const cancionForm = this.form.value;
      console.log(cancionForm);
      this.crearCancion(cancionForm.titulo , cancionForm.album , cancionForm.artista, cancionForm.fecha, cancionForm.estilo,  'imgurl', 'mp33333');
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
    img: string,
    url: string,
  ) {
    // Persist a document id
    const id = this.afs.createId();
    const cancion: any = { id, Titulo, Album, Artista, Fecha, Estilo, img, url };
    this.itemsCollection.doc(id).set(cancion);
  }


}

