import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Eventos } from "src/entity/eventos/interfaces/eventos.interface";

export class CriarCategoriaDto{

    /*@IsString()
    @IsNotEmpty()
    _id: string;*/

    @IsString()
    @IsNotEmpty()
    categoria: string;
    
    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Eventos>

    /*setId(_id: string): void{
        this._id = _id;       
    }*/
}