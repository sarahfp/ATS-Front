import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoUploadComponent } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { VagasService } from 'src/app/services/vagas.service';
import { FormControl } from '@angular/forms';
import { Candidato } from '../model/candidato.model';
import { CandidatosService } from 'src/app/services/candidatos.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;
  @ViewChild('optionsForm', { static: true }) form: NgForm | undefined;
  @ViewChild('formOpportunity', { static: true }) formOpportunity: FormControl | undefined;
  @ViewChild(PoUploadComponent, { static: true }) upload: PoUploadComponent | undefined;
  vagas: any;
  vagaSelecionada: any;
  uploadedResume: any;
  curriculoSalvar: any;
  curriculoID: any;
  candidatoSalvar: Candidato = new Candidato();

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.apply();
    },
    label: 'Enviar'
  };

  constructor(private vagasService: VagasService, private poNotification: PoNotificationService, private candidatosService: CandidatosService) { }

  ngOnInit() {
    this.vagasService.getVagas().subscribe(vagas => {
      this.vagas = vagas;
    })
  }
  openModal(vaga: any) {
    this.vagaSelecionada = vaga;
    if (this.poModal) this.poModal.open();
  }

  apply() {
    this.candidatoSalvar.vagaID = this.vagaSelecionada.id;
    this.candidatoSalvar.curriculoID = this.curriculoID;
    this.candidatosService.setCandidatos(this.candidatoSalvar).subscribe(retorno =>{
      this.poNotification.success('Candidatura enviada com sucesso!');
      this.closeModal();
    })
  }

  closeModal() {
    if (this.poModal) {
      this.poModal.close();
    }
  }

  resumeUploadError(event: any) {
    this.uploadedResume = false;
  }

  resumeUploadSuccess(event: any) {
    this.curriculoID = event.body.curriculoID;
    this.uploadedResume = true;
  }
}
