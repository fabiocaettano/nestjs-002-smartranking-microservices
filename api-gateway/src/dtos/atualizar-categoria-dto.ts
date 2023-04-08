import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Eventos } from "../entity/eventos/interfaces/eventos.interface";

export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Eventos>
}