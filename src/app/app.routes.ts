import { ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';
import { UsersComponent } from './componentes/users/users.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ajustes', canActivate:[UserGuard],component: UserEditComponent },
    { path: 'login', canActivate:[NoIdentityGuard],component: LoginComponent },
    { path: 'registro', canActivate:[NoIdentityGuard],component: RegisterComponent },
    { path: 'perfil/:id',component: PerfilComponent },
    { path: 'temas/:page', component: TopicsComponent },
    { path: 'buscar/:text', component: BuscarComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'tema/:id', component: TopicDetailComponent },
    { path: '**', component: PageNotFoundComponent },
];

// Exportar la configuracion 
export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
