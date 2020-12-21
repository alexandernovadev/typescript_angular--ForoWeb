import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from 'src/models/user';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit 
{
  urlapi = global.url
  users: User[]
  constructor(private _userSV: UsuarioService)
  {

  }

  ngOnInit()
  {

    this.getUsers();
  }

  getUsers()
  {
    this._userSV.getUsers().subscribe(
      res=>
      {
        if(res.status == 'success')
        {
          console.log(res);
          this.users = res.users
        }

      },
      err =>
      {

      }
    )
  }
}
