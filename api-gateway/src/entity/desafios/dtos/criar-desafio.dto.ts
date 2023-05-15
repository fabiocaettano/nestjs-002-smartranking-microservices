import { IsNotEmpty, IsDateString, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";
import {Jogador } from '../../jogadores/interfaces/jogador.interface';

export class CriarDesafioDto {
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;   

    @IsNotEmpty()
    categoria: string;

    @IsNotEmpty()
    solicitante: string;

    @IsNotEmpty()
    adversario: string;
}