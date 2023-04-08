import { BadRequestException, Body, Controller , Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarJogadorDto } from './dtos/cria-jogador.dto';
import { Observable } from 'rxjs';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { ProxyClient } from 'src/proxy/proxy-client';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
require('dotenv').config({ path: '.env' })


@Controller('api/v1')
export class JogadorController {  

    private logger = new Logger(JogadorController.name);

    constructor(private proxyClient: ProxyClient){}

    private clientAdminBackend = this.proxyClient.getClientProxyAdminBackendInstance();

    /*private clientAdminBackend: ClientProxy;    

    constructor(){
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URI],
                queue: 'admin-backend',
            }
        })
    }*/

    @Post('jogadores')
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ){        
        this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

        const categoria = await this.clientAdminBackend.send('consultar-categorias', criarJogadorDto.categoria);

        if (categoria){
            this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
        }else{
            throw new BadRequestException(`Categoria não encontrada`);
        }        
    }

    @Get('jogadores')
    consultaJogadores(): Observable<any>{        
        return this.clientAdminBackend.send('consultar-jogadores','');       
    }        

    @Get('jogadores/:_id')
    consultaJogadorPeloId(@Param('_id') _id : string): Observable<any>{        
        return this.clientAdminBackend.send('consultar-jogador-pelo-id',_id);       
    }

    @Put('jogadores/:_id')
    @UsePipes(ValidationPipe)
    atualizarJogador(@Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametrosPipe) _id : string){
        this.clientAdminBackend.emit('atualizar-jogador',{_id: _id, jogador: atualizarJogadorDto});
    }

    @Delete('jogadores/:_id')
    async deletarJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: string) {
           this.clientAdminBackend.emit('deletar-jogador', { _id })
    } 
 
 


}
