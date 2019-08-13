import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; //para trabajar con template
import { HttpClientModule } from '@angular/common/http'; //para poder hacer peticiones

import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //clase que ve el manejo de rutas
    FormsModule, //registramos el FormsModule para template
    HttpClientModule //registro el modulo de peticiones
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
