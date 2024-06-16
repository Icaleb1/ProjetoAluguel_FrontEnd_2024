import { EnderecosService } from './../../shared/service/endereco/enderecos.service';
import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../shared/model/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endereco-detalhe',
  templateUrl: './endereco-detalhe.component.html',
  styleUrl: './endereco-detalhe.component.scss'
})
export class EnderecoDetalheComponent implements OnInit {

  public endereco: Endereco = new Endereco();
  public idEndereco: number;

  constructor(
    private enderecosService: EnderecosService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idEndereco = params['id'];
      if(this.idEndereco){
        this.buscarEndereco();
      }
    })
  }

  public buscarEndereco(): void{
    this.enderecosService.consultarPorId(this.idEndereco).subscribe(
      (endereco) => {
        this.endereco = endereco;
      },
        (erro) => {
          Swal.fire('Erro ao buscar Endereço ', erro, 'error');
      }
    );
  }

  public salvar(): void{
    if(this.validarCampos()){
      if(this.idEndereco){
        this.atualizarEndereco();
      }else{
        this.cadastrarEndereco();
      }
    }
  }

  public validarCampos(): boolean{
    if(!this.endereco.nome || !this.endereco.bairro || !this.endereco.cep ||
      !this.endereco.cidade || !this.endereco.estado || this.endereco.numero
    ){
      Swal.fire('Erro!', 'Todos os campos devem ser preenchidos! ', 'error');
      return false;
    }
    return true;
  }

  public cadastrarEndereco(){
    this.enderecosService.cadastrarEndereco(this.endereco).subscribe(
      (resposta) => {
        Swal.fire('Endereço cadastrado com Sucesso! ', '', 'success'); this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao cadastrar Endereço! ', erro, 'error');
      }
    );
  }

  public atualizarEndereco(){
    this.enderecosService.atualizar(this.endereco).subscribe(
      (resposta) => {
        Swal.fire('Endereço editado com sucesso! ', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao editar endereço: ' + erro.error.mensagem, 'error');
      }
    );
  }

  voltar(){
    this.router.navigate(['/home/brinquedos']);
  }
}
