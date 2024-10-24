import { reservation } from './../model/reservation.model';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Type } from "../model/type.model";

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styleUrls: ['./liste-types.component.css']
})
export class ListeTypesComponent implements OnInit{
  types! : Type[];
  updatedTy:Type = {"idty":0,"typereservation":""};
  ajout:boolean=true;   
  constructor(private ReservationService : ReservationService) { } 
  ngOnInit(): void { 
  this.ReservationService.listetypes(). 
  subscribe(ty => {this.types = ty; 
  console.log(ty); 
  }); 
}
typeUpdated(ty:Type){ 
  console.log("Cat updated event",ty); 
  this.ReservationService.ajoutertype(ty). 
  subscribe( ()=>  this.chargerTypes()); 
  } 
  chargerTypes(){ 
    this.ReservationService.listetypes(). 
    subscribe(ty => {this.types = ty; 
    console.log(ty); 
    }); 
    } 
    updateTy(ty:Type) { 
      this.updatedTy=ty; 
      this.ajout=false;   
      } 
}
