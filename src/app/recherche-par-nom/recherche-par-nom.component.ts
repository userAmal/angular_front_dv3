
import { ReservationService } from '../services/reservation.service';
import { reservation } from './../model/reservation.model';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css'],
  providers: [DatePipe]
})
export class RechercheParNomComponent {
nomclient! : string;
reservations!: reservation[];
  allreservations!: reservation[];
  searchTerm!: string;
  
  constructor(private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.reservationService.listeReservation().subscribe(res => {
      console.log(res);
      this.reservations = res;
      });
  }

  rechercherres(){
    this.reservationService.rechercherParNom(this.nomclient).
    subscribe(res => {
      console.log(res);
      this.reservations=res;});
  }

  onKeyUp(filterText : string){
    }
    

/*  searchTerm: string = '';
  reservations! : reservation[];


  constructor(private reservationservice : ReservationService, public authService: AuthService){}

  ngOnInit() : void{
    this.reservations = this. reservationservice.listereservations();
    console.log(this.reservations);
  }

  supprimerreservation(r: reservation)
  {
    //console.log(r);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.reservationservice.supprimerreservation(r);
  }*/

}
