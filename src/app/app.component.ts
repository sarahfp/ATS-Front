import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router : Router){}

  ngOnInit() {
    
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onHome.bind(this)},
    { label: 'Gerenciar Vagas', action: this.onVaga.bind(this),  link:''} 
   ];

  private onHome() {
    this.router.navigate(['home']);
  }

  private onVaga() {
    this.router.navigate(['gerenciar-vagas']);
  }

}
