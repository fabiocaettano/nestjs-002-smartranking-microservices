import { ArgumentMetadata, PipeTransform, BadRequestException } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(`value: ${value} | metadata: ${metadata}`);
        
        if(!value){
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado.`)
        }
        return value
    }
}