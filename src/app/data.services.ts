import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cancion } from './servicios/canciones.service';
//import { AngularFirestore } from '@angular/fire/firestore'



@Injectable({
    providedIn:'root'
})
export class DataServices {


    //constructor (private firebase: AngularFireStore){}

    guardarCanciones(canciones:Cancion[]){
       // this.firebase.collection('canciones').add(canciones);
    }

    // guardarCanciones(canciones:Cancion[]){

    //     this.httpClient.post('https://musicweb-731d5-default-rtdb.europe-west1.firebasedatabase.app/datos.json',canciones).subscribe(

    //         response => console.log ("Se han guardado los" + response),

    //         error => console.log ("Error: " + error),
    //     );



    // }
}

