import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{

  user: User;
  status: String;

  constructor(private _userSV: UsuarioService)
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

  register(form)
  {
    // console.log(this.user);

    this._userSV.resgister(this.user).subscribe(
      response =>
      {
        //console.log("USER",response);
        
        switch (response.status) {
          case 'success':
            this.status = 'success';
            form.reset();
            break;
          case 'error':
            this.status = 'error';
            break;

          case 'duplicado':
            this.status = 'duplicado';
            break;
        
          default: 'nonepeticion'
            break;
        }

        // if(response.status == 'success')
        // {
        //   this.status = 'success';
        //   console.log(response.user);
        // }
        // else
        // {
        //   this.status = 'error';
        // }
      },
      err =>{console.log(err);
      }
    );
  }

}
