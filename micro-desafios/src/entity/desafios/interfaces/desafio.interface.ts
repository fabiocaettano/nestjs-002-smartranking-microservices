import { Document } from 'mongoose';
import { StatusDesafio } from "../../status/status-desafios.enum";

export interface Desafio extends Document {

    dataHoraDesafio: Date
    status: StatusDesafio
    dataHoraSolicitacao: Date
    dataHoraResposta?: Date
    solicitante: string
    categoria: string
    partida?: string
    jogadores: string[]
    
}
