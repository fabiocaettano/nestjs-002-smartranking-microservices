import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { Resultado } from "../../resultados/interfaces/resultado.interface";

export interface Partida {
    categoria?: string
    desafio?: string
    jogadores?: Jogador[]
    def?: Jogador
    resultado?: Resultado[]  
}