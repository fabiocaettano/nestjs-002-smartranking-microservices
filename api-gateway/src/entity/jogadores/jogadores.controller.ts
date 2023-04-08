import { Body, Controller , Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarJogadorDto } from './dtos/cria-jogador.dto';
import { Observable } from 'rxjs';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
require('dotenv').config({ path: '.env' })


@Controller('api/v1')
export class JogadorController {  

    private logger = new Logger(JogadorController.name);

    private clientAdminBackend: ClientProxy;    

    constructor(){
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URI],
                queue: 'admin-backend',
            }
        })
    }

    @Post('jogadores')
    @UsePipes(ValidationPipe)
    criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ){        
        this.clientAdminBackend.emit('criar_jogador', criarJogadorDto);
    }

    @Get('jogadores')
    consultaCategorias(): Observable<any>{        
        return this.clientAdminBackend.send('consultar-jogadores','');       
    }        

    @Get('jogadores/:jogador')
    consultaJogadorPeloId(@Param('id') _id : string): Observable<any>{        
        return this.clientAdminBackend.send('consultar-jogador-pelo-id',_id);       
    }

    @Put('jogadores/:_id')
    @UsePipes(ValidationPipe)
    atualizarJogador(@Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id') _id : string){
        this.clientAdminBackend.emit('atualizar-jogador',{id: _id, atualizar_jogador: atualizarJogadorDto});
    }
}
