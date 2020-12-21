import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck
{
  
  identity: String;
  token: String;

  constructor(private _userSV: UsuarioService)
  {

  }

  ngOnInit() 
  {
    this.identity = this._userSV.getIdentity();
    this.token = this._userSV.getToken();
  }

  ngDoCheck(): void {
    this.identity = this._userSV.getIdentity();
    this.token = this._userSV.getToken(); 
  }

}
