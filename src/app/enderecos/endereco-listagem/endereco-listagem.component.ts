import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endereco-listagem',
  templateUrl: './endereco-listagem.component.html',
  styleUrls: ['./endereco-listagem.component.scss']
})
export class EnderecoListagemComponent {
  constructor(private router: Router) {}

  cadastrarEndereco() {
    this.router.navigate(['/home/enderecos/detalhe']);
  }
}
