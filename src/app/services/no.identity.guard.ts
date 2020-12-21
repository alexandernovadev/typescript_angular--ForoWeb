import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable()
export class NoIdentityGuard implements CanActivate{

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
            this._route.navigate(['home']);
            return false
        }
        else
        {
             return true;
        }
    }
}