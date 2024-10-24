import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import ReservationComponent from './reservation/reservation.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { LoginComponent } from './login/login.component';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import {SearchFilterPipe} from "./search-filter.pipe";
import {RechercheParNomComponent} from "./recherche-par-nom/recherche-par-nom.component";
import {RechercheParTypeComponent} from "./recherche-par-type/recherche-par-type.component";
import { TokenInterceptor } from './services/token.interceptor';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { UpdateTypeComponent } from './update-type/update-type.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    AddReservationComponent,
    UpdateReservationComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParNomComponent,
    RechercheParTypeComponent,
    SearchFilterPipe,
    ListeTypesComponent,
    UpdateTypeComponent,
    RegisterComponent,
    VerifEmailComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
