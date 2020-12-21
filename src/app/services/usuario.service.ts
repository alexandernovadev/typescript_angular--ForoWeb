import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService 
{
  url: String;
  identity: String;
  token: String;

  constructor(private _http: HttpClient)
  {
    this.url = global.url;
  }

  resgister(user): Observable <any>
  {
    // Convertir el Object a JSON String
    let params = JSON.stringify(user);

    // Definir Cabecera
    let headers = new HttpHeaders().set('Content-Type',' application/json');

    // Hacer Peticion Ajax
    return this._http.post(this.url+'register', params ,{headers});
  }

  login(user, getToken = null): Observable <any> 
  {
    // Comprobar si el token get est activo

    if (getToken != null)
    {
      user.getToken = getToken;  
    }

    // Convertir el Object a JSON String
    let params = JSON.stringify(user);
   
    // Definir Cabecera
    let headers = new HttpHeaders().set('Content-Type',' application/json');

    // Hacer Peticion Ajax
    return this._http.post(this.url+'login', params ,{headers});
  }

  getIdentity()
  {
    let identity =JSON.parse(localStorage.getItem('identity'));

    if(identity && identity != null && identity != undefined && identity != 'undefined') 
    {
      this.identity = identity;
    }
    else
    {
      this.identity = null;
    }

    return this.identity;
  }

  getToken()
  {
    let token = localStorage.getItem('token');

    if(token && token != null && token != undefined && token != 'undefined') 
    {
      this.token = token;
    }
    else
    {
      this.token = null;
    }

    return this.token;
  }

  updateuser(user: any, token: any): Observable <any> 
  {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);

    return this._http.put(this.url+'update', params ,{headers});               

  }

  getUsers(): Observable <any> 
  {
    return this._http.get(this.url+'users');
  }

  getUser(id: any): Observable <any> 
  {
    return this._http.get(`${this.url}/user/${id}`);
  } 
}
