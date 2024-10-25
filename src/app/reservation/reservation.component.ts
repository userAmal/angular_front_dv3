import { reservation } from './../model/reservation.model';
import { Component } from '@angular/core';

import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
})
export default class ReservationComponent   {

    reservations? : reservation[]; //un tableau de produits
    apiurl:string='http://localhost:8080/reservations/api'; 
  constructor(private reservationService: ReservationService,
              public authService: AuthService) {
   //this.produits=[];
     }
     ngOnInit(): void {

      this.chargerReservations();
    }

  chargerReservations(){
     this.reservationService.listeReservation().subscribe(res => {
     console.log(res);
      this.reservations = res;
      this.reservations.forEach((res) => { 

        res.imageStr = 'data:' + res.images[0].type + ';base64,' +  res.images[0].image;      }); 
       });          

  }

  supprimerReservation(r: reservation)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.reservationService.supprimerReservation(r.idReservation).subscribe(() => {
        console.log("Reservation  supprimé");
        this.chargerReservations();

});
}
}
/*  reservations: reservation[];
  constructor(private reservationservice: ReservationService ,public authService: AuthService ) {
    this.reservations = reservationservice.listereservations();
    }
    supprimerreservation(r: reservation)
  {
  //console.log(r);
   let conf = confirm("Etes-vous sûr ?");
   if (conf)
    this.reservationservice.supprimerreservation(r);
  }


}*/
