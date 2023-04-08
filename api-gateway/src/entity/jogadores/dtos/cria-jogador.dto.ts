import { IsNotEmpty, IsEmail } from 'class-validator';

export class CriarJogadorDto{

    @IsNotEmpty()
    telefoneCelular: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    nome: string;

    constructor(telefoneCelular: string, email: string, nome: string){
        this.telefoneCelular = telefoneCelular;
        this.email = email;
        this.nome = nome;
    }
}