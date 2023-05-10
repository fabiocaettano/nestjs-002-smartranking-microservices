import { Document } from 'mongoose';
import { Resultado } from '../../resultados/interface/resultado.interface';

export interface Partida extends Document{
    categoria: string
    desafio: string
    jogadores: string[]
    def: string
    resultado: Array<Resultado>  
}
