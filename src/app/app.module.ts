import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VagasComponent } from './components/vagas/vagas.component';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { GerenciarVagasComponent } from './components/gerenciar-vagas/gerenciar-vagas.component';

@NgModule({
  declarations: [
    AppComponent,
    VagasComponent,
    CandidatosComponent,
    GerenciarVagasComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
