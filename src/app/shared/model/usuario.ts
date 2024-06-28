import { Endereco } from "./endereco";

export class Usuario {

  id: number;
	nome: string;
	email: string;
//	senha: string;
	cpf: string;
	data_nascimento: Date;
	telefone: string;
	administrador: boolean;
	enderecos: Array<Endereco>;
	ativo: boolean;


}
