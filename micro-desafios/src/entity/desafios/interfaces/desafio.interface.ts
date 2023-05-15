import { Document } from 'mongoose';
import { DesafioStatus } from '../../status/desafio.enum';

export interface Desafio extends Document {

    dataHoraDesafio: Date
    status: DesafioStatus
    dataHoraSolicitacao: Date
    dataHoraResposta?: Date    
    categoria: string
    solicitante: string
    adversario: string
    partida?: string
    
    
}
