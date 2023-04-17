import { Jogador } from "../jogadores/interfaces/jogador.interface";
import { Resultado } from "../resultados/interfaces/resultado.interface";

export interface Partida {
    categoria: string,
    jogadores: Array<Jogador>
    def: Jogador
    resultado:  Array<Resultado>
}