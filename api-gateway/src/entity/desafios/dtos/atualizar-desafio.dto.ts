import { IsOptional } from "class-validator";
import { StatusDesafio } from "../../status/desafios/status-status.enum";

export class AtualizarDesafioDto{

    @IsOptional()
    dataHoraDesafio: Date;

    @IsOptional()
    status: StatusDesafio;

}