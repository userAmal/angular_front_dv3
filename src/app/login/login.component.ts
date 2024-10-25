import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();  
  err : number = 0;
  message : string = "login ou mot de passe erronés.."; 
    constructor(private authService : AuthService,
    private router: Router) { }
    onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;  
        if (err.error.errorCause=='disabled') 
        this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur"; 
        } 
        }); 
  

    /*console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
    this.router.navigate(['/']);
    else
    //alert('Login ou mot de passe incorrecte!');
    this.erreur=1;*/
    }
  }

