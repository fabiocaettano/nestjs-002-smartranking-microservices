import { Eventos } from '../../eventos/interfaces/eventos.interface';

export interface Categoria {
    readonly _id: string;
    readonly categoria: string;
    descricao: string;
    eventos: Array<Eventos>;
}