import { BadRequestException, PipeTransform } from "@nestjs/common";
import { StatusDesafio } from "../../status/desafios/status-status.enum"

export class tatusDesafioValidationPipe implements PipeTransform{

    readonly statusPermitidos = [
        StatusDesafio.ACEITO,
        StatusDesafio.NEGADO,
        StatusDesafio.CANCELADO
    ];

    transform(value: any){
        const status =  value.status.toUpperCase();
        if(!this.statusValidos(status)){
            throw new BadRequestException(`${status} é um status inválido`)
        }
        return value;
    }

    private statusValidos(status: any){
        const idx = this.statusPermitidos.indexOf(status);
        return idx !== -1;
    }
}