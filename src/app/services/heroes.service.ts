import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //importar el httpclient
import { HeroeModel } from '../models/heroe.model'; //importar el heroemodel
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-1a032.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${ this.url }/heroes.json`, heroe) //lo que quiero mandar al backend en este caso el heroe
            .pipe(
              map( (resp: any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );

  }

  actualizarHeroe( heroe: HeroeModel ) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp); //le paso solo el id no el objeto entero, para que no cree otro nuevo


  }

  borrarHeroe( id: string ) { //recibo por argumento el id del heroe que quiero borrar

    return this.http.delete(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroe( id: string ) { //busco heroe por id

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0) //hace un pequeño delay a la petición
            );
  }

  private crearArreglo( heroesObj: object ) {

    const heroes: HeroeModel[] = [];

    console.log(heroesObj);

    if(heroesObj===null){return [];} //retorno un objeto vacío cuando no tengo nada en la bdd

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key]; //extrae cada propiedad del objeto gracias a la propiedad key
      heroe.id = key; //guarda el identificador del objeto

      heroes.push( heroe ); //guardo ese heroe en el arreglo de heroes
    });


    return heroes; //retorna el arreglo de heroes de tipo HeroeModel

  }


}
