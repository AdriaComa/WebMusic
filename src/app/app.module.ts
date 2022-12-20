import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CancionComponent } from './listaCanciones/listaCanciones.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PlaySongComponent } from './play-song/play-song.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FiltroCancionesPipe } from './pipe/filtro.pipe';
import { CommonModule } from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';





//Servicios

import { CancionesService } from './servicios/canciones.service';
import { ServicioReproducirCancion } from './servicios/servicio-reproducir-cancion.service';
import { detalleCancionComponent } from './detalleCancion/detalleCancion.component';
import { APP_ROUTING } from './app.routes';
import { TextFilterComponent } from './filtro-canciones/filtro-canciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleCancionFormComponent } from './detalleCancion-form/detalleCancion-form.component';
import { DataServices } from './data.services';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CancionComponent,
    NavbarComponent,
    HomeComponent,
    detalleCancionComponent,
    HeaderComponent,
    ReproductorComponent,
    TextFilterComponent,
    PlaySongComponent,
    FiltroCancionesPipe,
    DetalleCancionFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    APP_ROUTING

  ],
  exports: [MatSliderModule, MatCardModule],
  providers: [//DataServices,
    CancionesService,
    ServicioReproducirCancion
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
