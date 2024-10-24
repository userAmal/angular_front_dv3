import { reservation } from './../model/reservation.model';
import {ReservationService} from '../services/reservation.service';
import {Component, OnInit} from '@angular/core';
import {Type} from '../model/type.model'

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
})
export class RechercheParTypeComponent implements OnInit {

  IdType! : number;
  types! : Type[];
  reservations! : reservation[];


  constructor(private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.reservationService.listetypes().
      subscribe(ty=> {this.types = ty;
      console.log(ty);
    });
  }


  onChange() {
    if (this.IdType) {
      this.reservationService.rechercherParType(this.IdType).subscribe((res) => {
        console.log(res)
        this.reservations = res;
      });
    }

  /*  idtype!: number;
  reservations!: reservation[];
  types!: Type[]

  constructor(private reservationservice: ReservationService, public authService: AuthService) {}
    ngOnInit()
  :
    void {
      this.types = this.reservationservice.listetypes();
      console.log(this.types);
    }
    onChange()
    {
      this.reservations = this.reservationservice.recherchepartype(this.idtype);
    }

  supprimerreservation(r: reservation)
  {
    //console.log(r);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.reservationservice.supprimerreservation(r);
  }*/

  }}
