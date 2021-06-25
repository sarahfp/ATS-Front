import { Component, OnInit, ViewChild } from '@angular/core';
import { VagasService } from 'src/app/services/vagas.service';
import { PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Vaga } from '../model/vaga.model';
import { Curriculo } from '../model/curriculo.model';
import { PoDialogService } from '@po-ui/ng-components';
import { CandidatosService } from 'src/app/services/candidatos.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-gerenciar-vagas',
  templateUrl: './gerenciar-vagas.component.html',
  styleUrls: ['./gerenciar-vagas.component.css']
})

export class GerenciarVagasComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;
  vagas: any;
  vagaSelecionada: any;
  colunas: any;
  itens: any;
  requisitos: any[] = new Array();
  vagaSalvar: Vaga = new Vaga();
  curriculoSalvar: Curriculo = new Curriculo();
  vagaEditar: boolean = false;
  candidatos: any;

  actions: Array<PoTableAction> = [
    {
      action: this.editarVaga.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar',
    },
    { action: this.excluirVaga.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
  ];

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.salvar();
    },
    label: 'Salvar'
  };
  formOpportunity: any;
  form: any;

  constructor(private vagasService: VagasService, private poNotification: PoNotificationService,
              public poDialog: PoDialogService, private candidatosService : CandidatosService) { }

  ngOnInit(): void {
    this.colunas = this.getColumns();
    
    this.candidatosService.getCandidatos().subscribe(retorno =>{
      this.candidatos = retorno;
      this.getVagas(); 
    })
    
  }

  getCurriculo(curriculoID: string, nomefile : any){
    this.curriculoSalvar.curriculoID = curriculoID;
    this.candidatosService.downloadCurriculo(this.curriculoSalvar).subscribe(retorno=>{
      let curriculo = new File([atob(retorno)], "filename.json" , { type: "application/pdf"});
      saveAs(curriculo,"Curriculo - " + nomefile + ".pdf");

    })
  }

  getVagas(){
    this.vagasService.getVagas().subscribe(vagas => {
      this.vagas = vagas;
      this.itens = this.getItems();
    })
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id' , visible: false},
      { property: 'candidatos' , visible:false},
      { property: 'nome' },
      { property: 'descrição' },
      { property: 'local' }
    ];
  }

  getItems(): Array<any> {
    let retorno = new Array();
    for(let i = 0; i<this.vagas.length;i++){
      retorno.push({id: this.vagas[i].id, nome: this.vagas[i].nome, descrição: this.vagas[i].descricao, local: this.vagas[i].local, candidatos: this.getCandidatosVaga(this.vagas[i].id)});  
    }
    return retorno;
  }

  getCandidatosVaga(id:any){
    let retorno = new Array();
    for(let i=0; i<this.candidatos.length; i++){
      if(this.candidatos[i].vagaID == id){
        retorno.push(this.candidatos[i]);
      }
    }
    return retorno;
  }

  openModal() {
    if (this.poModal) this.poModal.open();
  }

  criarVaga(){
    this.vagaSalvar = new Vaga();
    this.vagaEditar = false;
    this.openModal();
  }

  salvar() {
    if(!this.vagaEditar){
      this.vagasService.setVagas(this.vagaSalvar).subscribe(retorno =>{
        this.poNotification.success('Vaga cadastrada com sucesso!');
        this.closeModal();
        this.getVagas();
        this.vagaSalvar = new Vaga();
      })
    } else{
      this.vagasService.updateVagas(this.vagaSalvar).subscribe(retorno =>{
        this.poNotification.success('Vaga atualizada com sucesso!');
        this.closeModal();
        this.getVagas();
        this.vagaSalvar = new Vaga();
      })
    }

  }

  closeModal() {
    if (this.poModal) {
      this.poModal.close();
      this.vagaSalvar = new Vaga();
    }
  }

  editarVaga(item:any){
    this.vagaEditar = true;
    this.vagaSalvar.id = item.id;
    this.vagaSalvar.nome = item.nome;
    this.vagaSalvar.descricao = item.descrição;
    this.vagaSalvar.local = item.local;
    this.openModal();

  }

  excluirVaga(item:any){
    this.poDialog.confirm({
      literals: { cancel: 'Não', confirm: 'Sim' },
      title: 'Excluir Vaga',
      message: 'Deseja realmente excluir essa vaga?',
      confirm: () => this.vagasService.deleteVagas(item).subscribe(retorno=>{
        this.poNotification.success('Vaga excluida com sucesso!');
        this.getVagas();
      })
    });

  }


}
