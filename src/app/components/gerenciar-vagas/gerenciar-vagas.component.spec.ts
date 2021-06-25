import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarVagasComponent } from './gerenciar-vagas.component';

describe('GerenciarVagasComponent', () => {
  let component: GerenciarVagasComponent;
  let fixture: ComponentFixture<GerenciarVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarVagasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
