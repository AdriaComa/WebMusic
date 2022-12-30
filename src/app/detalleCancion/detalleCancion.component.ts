import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioVerDetalleService } from '../servicio-ver-detalle.service';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Cancion, CancionesService } from '../servicios/canciones.service';
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

  form: FormGroup = null!;




  constructor(private activatedRoute: ActivatedRoute,
    private _cancionesService: CancionesService,
    private router: Router,
    private servicioDetalle: ServicioVerDetalleService,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder

  ) {




  }


  private buildForm(cancion: any) {
    this.form = new FormGroup({
      artista: new FormControl(cancion.artista),
      titulo: new FormControl(cancion.titulo),
      album: new FormControl(cancion.album),
      fecha: new FormControl(cancion.fecha),
      estilo: new FormControl(cancion.estilo),
      description: new FormControl(cancion.description),
    });
  }

  ngOnInit() {

    this.servicioDetalle.disparadorDetalle.subscribe(data => {
      console.log("HOLI");
      console.log(data);
      this.cancion = data;
      console.log("This: ", this.cancion)

      this.buildForm(this.cancion)

    })

  }

  updateCancion(id: string) {

    if (this.form.valid) {
      const cancionForm = this.form.value;
      console.log("FORMULARIO: ", cancionForm);

      this.afs.doc('canciones/' + id).update({
        Artista: cancionForm.artista,
        Album: cancionForm.album,
        Titulo: cancionForm.titulo,
        Fecha: cancionForm.fecha,
        Estilo: cancionForm.estilo,
        Descripcion: cancionForm.description

      });

    } else {
      console.log("NO VALIDO")
    }


  }



}

