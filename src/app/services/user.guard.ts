import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { identity } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate{

    constructor(
        private _route: Router,
        private _userSV: UsuarioService,
    ){
        
    }

    canActivate()
    {
        let identity = this._userSV.getIdentity();

        if(identity)
        {
            return true;
        }
        else
        {
            this._route.navigate(['home']);
            return false
        }
    }
}