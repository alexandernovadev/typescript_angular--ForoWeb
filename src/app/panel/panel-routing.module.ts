import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UserGuard } from '../services/user.guard';


const routes: Routes = [
    {path: 'panel',
     component: MainComponent,
     canActivate: [UserGuard],
     children: [
         {path: '', component: ListComponent},
         {path: 'listado', component: ListComponent},
         {path: 'crear', component: AddComponent},
         {path: 'editar/:id', component: EditComponent},
         {path: 'eliminar/:id', component: DeleteComponent},
     ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelRoutingModule {}
