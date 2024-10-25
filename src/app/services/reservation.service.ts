
import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {reservation} from '../model/reservation.model';
import {Router} from '@angular/router';
import {Type} from '../model/type.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TypeWrapper } from '../model/TYPEWrapper.model';
import { Image } from '../model/image.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  types!: Type[];
  apiURL: string = 'http://localhost:8080/reservations/api';
  apiURLty: string = 'http://localhost:8080/reservations/api/typ';

  reservations! : reservation[]; //un tableau de produits
  //categories : Categorie[];


  constructor(private http : HttpClient,
              private authService : AuthService) {

    /* this.categories = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ]; */
  /*  this.produits = [{idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"),
                      categorie : {idCat : 1, nomCat : "PC"} },
                     {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"),
                    categorie :  {idCat : 2, nomCat : "Imprimante"}},
                     {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"),
                     categorie : {idCat : 1, nomCat : "PC"}}
                    ];
                    */

  }

  listeReservation(): Observable<reservation[]>{
     return this.http.get<reservation[]>(this.apiURL+"/all");
     

    }

    ajouterReservation( res: reservation):Observable<reservation>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<reservation>(this.apiURL+"/addres", res, {headers:httpHeaders});
      }


   
  supprimerReservation(id : number) {
       const url = `${this.apiURL}/delres/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.delete(url,  {headers:httpHeaders});
        }

   consulterReservation(id: number): Observable<reservation> {
          const url = `${this.apiURL}/getbyid/${id}`;
          console.log(url);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.get<reservation>(url,{headers:httpHeaders});
          }

    updatereservation(res :reservation) : Observable<reservation>    {
       console.log("resssss "+res);
        console.log(res.type);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.put<reservation>(this.apiURL+"/updateres", res, {headers:httpHeaders});
          }



       listetypes():Observable<Type[]>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return  this.http.get<Type[]>(this.apiURLty,{headers:httpHeaders});

            }
            consultertype(id: number): Type {
              return this.types.find((type) => type.idty == id)!;
            }

       rechercherParType(idty: number): Observable<reservation[]> {
          const url = `${this.apiURL}/resty/${idty}`;
          return this.http.get<reservation[]>(url);
         }

  rechercherParNom(nom: string):Observable< reservation[]> {
    const url = `${this.apiURL}/resByName/${nom}`;
    return this.http.get<reservation[]>(url);
    }

    ajoutertype(typ: Type):Observable<Type>{
      let jwt = this.authService.getToken();
      jwt = 'Bearer ' + jwt;
      let httpHeaders = new HttpHeaders({ Authorization: jwt });
      return this.http.post<Type>(this.apiURLty + '/addtype', typ, {
        headers: httpHeaders,
      });
      }
      uploadImage(file: File, filename: string): Observable<Image>{ 
        const imageFormData = new FormData(); 
        imageFormData.append('image', file, filename); 
        const url = `${this.apiURL + '/image/upload'}`; 
        return this.http.post<Image>(url, imageFormData); 
     } 
 
loadImage(id: number): Observable<Image> { 
  const url = `${this.apiURL + '/image/get/info'}/${id}`; 
  return this.http.get<Image>(url); 
} 
uploadImageRes(file: File, filename: string, idRes:number): Observable<any>{ 
  const imageFormData = new FormData(); 
  imageFormData.append('image', file, filename); 
  const url = `${this.apiURL + '/image/uplaodImageRes'}/${idRes}`; 
  return this.http.post(url, imageFormData); 
} 
supprimerImage(id : number) { 
  const url = `${this.apiURL}/image/delete/${id}`; 
  return this.http.delete(url, httpOptions); 
  } 
  uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{ 
    const imageFormData = new FormData(); 
    imageFormData.append('image', file, filename); 
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`; 
    return this.http.post(url, imageFormData); }
}

/*import { AuthService } from './services/auth.service';
import {Injectable} from '@angular/core';
import {reservation} from './model/reservation.model';
import {Router} from '@angular/router';
import {Type} from './model/type.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService
{
  apiURL: string = 'http://localhost:8080/produits/api';
  reservations: reservation[];
  reservation!: reservation;
  //types: Type[];

  constructor(private router: Router, private http: HttpClient,private AuthService: AuthService) {
    /*this.types = [
      {idty: 1, typereservation: "en ligne"},
      {
        idty: 2, typereservation: "sur place"
      }]
    this.reservations = [
      {
        idReservation: 1,
        nomclient: "amal bouaouina",
        prixsejour: 400,
        datedebut: new Date("11/01/2011"),
        datefin: new Date("11/04/2011"),
        type: {idty: 1, typereservation: "en ligne"}
      },
      {
        idReservation: 2,
        nomclient: "Syrine bousetta",
        prixsejour: 250,
        datedebut: new Date("12/05/2011"),
        datefin: new Date("12/07/2011"),
        type: {idty: 2, typereservation: "sur place"}
      },
      {
        idReservation: 3,
        nomclient: "ranim jrad",
        prixsejour: 500,
        datedebut: new Date("01/01/2012"),
        datefin: new Date("01/05/2012"),
        type: {idty: 1, typereservation: "en ligne"}
      },

    ]

  }

  listereservations():  Observable<reservation[]>{
    let jwt = this.AuthService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<reservation[]>(this.apiURL+"/all",{headers:httpHeaders});


  }

  ajouterreservation(res: reservation) :Observable<reservation>{
    //this.reservations.push(res);
    //this.router.navigate(['reservation']);
      let jwt = this.AuthService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<reservation>(apiURL+"/addres", res, {headers:httpHeaders});
      }


  }

  supprimerreservation(res: reservation) {
    //supprimer le produit prod du tableau reservation
    const index = this.reservations.indexOf(res, 0);
    if (index > -1) {
      this.reservations.splice(index, 1);
    }
    //ou Bien
     this.reservation.forEach((cur, index) => {
    if(res.idReservation === cur.idReservation) {
    this.reservations.splice(index, 1);
    }
    });
  }

  consulterreservation(id: number): reservation {
    this.reservation = this.reservations.find(p => p.idReservation == id)!;
    return this.reservation;
  }

  trierreservations() {
    this.reservations = this.reservations.sort((n1, n2) => {
      if (n1.idReservation ! > n2.idReservation!) {
        return 1;
      }
      if (n1.idReservation! < n2.idReservation!) {
        return -1;
      }
      return 0;
    });
  }

  updatereservation(r: reservation) {
// console.log(r);
    this.supprimerreservation(r);
    this.ajouterreservation(r);
    this.trierreservations();

  }

  listetypes(): Type[] {
    return this.types;
  }

  consultertypes(id: number): Type {
    return this.types.find(ty => ty.idty == id)!;
  }

  recherchepartype(idty: number): reservation[] {
    const filteredReservations = this.reservations.filter((reservation) => reservation.type.idty == idty);
    return filteredReservations;
  }


}*/
