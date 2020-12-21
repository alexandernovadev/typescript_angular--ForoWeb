import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  user: User;
  status: String;
  typeerror: String;
  identity: String;
  token: String;

  constructor(private _userSV: UsuarioService,
            private _router: Router)
  {
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_USER',
    );
  }

  ngOnInit() 
  {

  }

  login(form)
  {
    // console.log("logints",this.user);

    this._userSV.login(this.user).subscribe(
      response=>
      {
        // console.log(response);

        switch (response.status) {
          case 'success':
            this. status = 'success';

            this.identity = response.user;
            localStorage.setItem('identity',JSON.stringify(response.user));

            this._userSV.login(this.user, true).subscribe(
              response=>
              {
                //console.log("Aqui no ", response);
                
                this.token = response.token;
                localStorage.setItem('token',response.token);
              },
              err=>{console.log("Error", err);
              }
              );
              setTimeout(() => {
                this._router.navigate(['/home']);
              }, 2000);
          break;

          case 'error':
            this. status = 'error'
            this.typeerror = response.message;
          break;
        
          default: 'error'
          this. status = 'error'
            break;
        }
      },
      err =>
      {
        console.log(err);
      }
    );
    
    
  }

}
