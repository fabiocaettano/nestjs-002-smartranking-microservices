import { IsNotEmpty } from "class-validator";
import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { Resultado } from "../../resultados/interfaces/resultado.interface";

export class AtribuirDesafioPartidaDto{

    @IsNotEmpty()
    def: Jogador

    @IsNotEmpty()
    resultado: Array<Resultado>
}