// Modulos Nesesarios
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

// Componentes de Modulo
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { DeleteComponent } from './components/delete/delete.component';
import { PanelRoutingModule } from './panel-routing.module';
import { UsuarioService } from '../services/usuario.service';
import { UserGuard } from '../services/user.guard';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PanelRoutingModule,
    MomentModule,
   
  ],
  exports: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
  ],
  providers: [
    UsuarioService,
    UserGuard
  ]
})
export class PanelModule { }
