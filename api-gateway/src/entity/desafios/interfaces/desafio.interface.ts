import { Jogador } from "../../jogadores/interfaces/jogador.interface";
import { StatusDesafio } from "../../status/desafios/status-status.enum";
import { Partida } from "../../partidas/partida.interface";

export interface Desafio{

    status: StatusDesafio
    dataHoraDesafio: Date
    dataHoraSolicitada: Date
    dataHoraResposta: Date
    solicitante: Jogador
    categoria: string
    jogadores: Array<Jogador>
    partida: Partida
}