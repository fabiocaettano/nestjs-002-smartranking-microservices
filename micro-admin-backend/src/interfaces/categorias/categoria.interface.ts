import { Eventos } from '../eventos/evento.interface';
import { Jogador } from '../jogadores/jogador.interface';

export interface Categoria extends Document {
    readonly categoria: string;
    descricao: string;    
    eventos: Array<Eventos>;
    jogadores: Array<Jogador>;
}