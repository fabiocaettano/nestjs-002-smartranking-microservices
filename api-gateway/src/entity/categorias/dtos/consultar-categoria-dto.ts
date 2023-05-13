import {  IsNotEmpty, IsString } from "class-validator";


export class ConsultarCategoriaDto{

    @IsString()
    @IsNotEmpty()
    categoria: string;
}