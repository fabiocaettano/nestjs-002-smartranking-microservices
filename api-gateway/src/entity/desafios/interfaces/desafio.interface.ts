import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { StatusDesafio } from "../../status/desafios/status-status.enum";

export interface Desafio{

    dataHoraDesafio: Date
    status: StatusDesafio    
    dataHoraSolicitada: Date
    dataHoraResposta: Date
    solicitante: Jogador
    categoria: string
    partida?: string
    jogadores: Array<Jogador>
    
}