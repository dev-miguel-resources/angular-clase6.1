import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model'; //importamos el heroe.model
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = []; //hago un arreglo de heroe model
  cargando = false;


  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false; //cuando ya tengo información el cargando queda false
      });

  }

  borrarHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) { // si es true si debo borrarlo
        this.heroes.splice(i, 1); //detalla que se borre un registro sin cargar la pagina
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }

    });



  }


}
