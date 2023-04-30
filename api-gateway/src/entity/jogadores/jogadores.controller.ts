import { BadRequestException, Body, Controller , Delete, Get, Logger, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/cria-jogador.dto';
import { Observable } from 'rxjs';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { ProxyClient } from 'src/proxy/proxy-client';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../aws/aws.service';
require('dotenv').config({ path: '.env' })


@Controller('api/v1')
export class JogadorController {  

    private logger = new Logger(JogadorController.name);
    private idCategoria : string = "";

    constructor(
        private proxyClient: ProxyClient,
        private awsService: AwsService){}

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
        this.logger.log(`Criar Jogador Dto 1: ${JSON.stringify(criarJogadorDto)}`);             
        
        //const _id : any = await this.clientAdminBackend.send('consultar-categoria-pela-descricao', criarJogadorDto.categoria).subscribe((response) => { return response._id; });             
        const categoria = await this.clientAdminBackend.send('consultar-categoria-pela-descricao', criarJogadorDto.categoria)
        .forEach(categoria => { 
            //console.log(categoria)
            this.idCategoria = categoria._id 
        });
        
        //console.log(this.idCategoria);
        
        criarJogadorDto.categoria = this.idCategoria;

        console.log(criarJogadorDto);

        if (this.idCategoria){           
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

    @Post('/jogadores/:_id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo(
        @UploadedFile() file,
        @Param('_id') _id: string){
            
            // Verificar se o jogador está cadastrado
            const jogador = this.clientAdminBackend.send('consultar-jogador-pelo-id', _id);

            if(!jogador){
                throw new BadRequestException('Jogador não encontrado!');
            }

            // Enviar o arquivo para S3 e recuperar a URL de acesso
            const fotoJogador = await this.awsService.upload(file, _id);
            console.log(fotoJogador.url);

            //Atuaizar o atributo URL da entidade Jogador
            const atualizarJogadorDto : AtualizarJogadorDto = {}
            atualizarJogadorDto.urlFotoJogador = fotoJogador.url;

            this.clientAdminBackend.emit('atualizar-jogador',{_id: _id, jogador: atualizarJogadorDto});

            // Retornar Jogador
            return this.clientAdminBackend.send('consultar-jogador-pelo-id', _id);            
    }

    @Delete('/jogadores/:file/file')
    async deletarArquivo(
        @Param('file') file: string){
            await this.awsService.delete(file);
    }   

}
 
 


