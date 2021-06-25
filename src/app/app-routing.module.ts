import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciarVagasComponent } from './components/gerenciar-vagas/gerenciar-vagas.component';
import { VagasComponent } from './components/vagas/vagas.component';

const routes: Routes = [ 
{ path: '', component: VagasComponent },
{ path: 'home', component: VagasComponent },
{ path: 'gerenciar-vagas', component: GerenciarVagasComponent },]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

   
}
