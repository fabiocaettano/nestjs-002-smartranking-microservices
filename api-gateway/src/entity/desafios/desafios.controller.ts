import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete, Logger, BadRequestException } from '@nestjs/common';
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { Jogador } from '../jogadores/interfaces/jogador.interface'
import { Desafio } from '../desafios/interfaces/desafio.interface'
import { StatusDesafio } from '../status/desafios/status-status.enum';
import { Partida } from '../partidas/interfaces/partida.interface';
import { ProxyClient } from 'src/proxy/proxy-client';
import { StatusDesafioValidationPipe } from './pipes/status-desafio-validation.pipes';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio.dto';
import { Observable } from 'rxjs';
import { CriarJogadorDto } from '../jogadores/dtos/cria-jogador.dto';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(
      private proxyClient: ProxyClient) {}

    private readonly logger = new Logger(DesafiosController.name)
    private idCategoria : string = "";
    private contagemJogador : number = 0;    
    private _id : string = "";

    /*
        Criamos um proxy específico para lidar com o microservice
        desafios
    */
    private clientDesafios = this.proxyClient.getClientProxyDesafiosInstance()

    private clientAdminBackend = this.proxyClient.getClientProxyAdminBackendInstance()

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto) {
            
            this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)                   

            /*
                Atualizar idCategoria 
            */
            const categoria = await this.clientAdminBackend.send('consultar-categoria-pela-descricao', criarDesafioDto.categoria)
            .forEach(categoria => { 
                //console.log(categoria)
                this.idCategoria = categoria._id 
            });

            criarDesafioDto.categoria = this.idCategoria;           

             /*
                Verificamos se os jogadores do desafio estão cadastrados
            */

            
            this._id = criarDesafioDto.solicitante;    
            await this.clientAdminBackend.send('contagem-jogador-pelo-id', this._id)
            .forEach(contagem => {
                this.contagemJogador = contagem
            })           
    
            if (this.contagemJogador != 1){
                throw new BadRequestException(`O jogador ${criarDesafioDto.solicitante} não esta cadastrado !`);
            }                

            this.contagemJogador = 0;
            this._id = criarDesafioDto.adversario;    
            await this.clientAdminBackend.send('contagem-jogador-pelo-id', this._id)
            .forEach(contagem => {
                this.contagemJogador = contagem
            })           

            if (this.contagemJogador != 1){
                throw new BadRequestException(`O jogador ${criarDesafioDto.adversario} não esta cadastrado !`);
            }           

            /*
                Jogadores devem ser direntes
            */
            if(criarDesafioDto.solicitante === criarDesafioDto.adversario){
                throw new BadRequestException(`O jogador não pode desafiar a si mesmo.`)
            }

            /*
                Verificando se o solicitante é um jogador da partida
            */
            /*
            const verificarJogador = new VerificarJogador();
            verificarJogador.jogador._id = criarDesafioDto.solicitante._id

            
            if (!(verificarJogador.jogadores[0]._id == criarDesafioDto.jogadores[0]._id) && !(verificarJogador.jogadores[0]._id == criarDesafioDto.jogadores[1]._id)){
                throw new BadRequestException(`O Solicitante deve fazer parte da partida.`)
            }*/         


            /*
                Verificamos se a categoria está cadastrada
            */           

            if (!this.idCategoria) {
                throw new BadRequestException(`Categoria informada não existe!`)
            }

            await this.clientDesafios.emit('criar-desafio', criarDesafioDto)
    }
    
    @Get()
    async consultarDesafios(
        @Query('idJogador') idJogador: string): Promise<any> {

        /*
            Verificamos se o jogador informado está cadastrado
        */
        if ( idJogador ) {
            const jogador: Jogador = await this.clientAdminBackend.send('consultar-jogadores', idJogador ).toPromise()
            this.logger.log(`jogador: ${JSON.stringify(jogador)}`)
            if (!jogador) {
                throw new BadRequestException(`Jogador não cadastrado!`)

            }
        }
        /*
            No microservice desafios, o método responsável por consultar os desafios
            espera a estrutura abaixo, onde:
            - Se preenchermos o idJogador a consulta de desafios será pelo id do 
            jogador informado
            - Se preenchermos o campo _id a consulta será pelo id do desafio
            - Se não preenchermos nenhum dos dois campos a consulta irá retornar
            todos os desafios cadastrados
        */
        return this.clientDesafios.send('consultar-desafios', { idJogador: idJogador , _id: '' }).toPromise()
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(StatusDesafioValidationPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string) {

            /*
                Validações em relação ao desafio
            */
            
            const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

            this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
            /*
                Verificamos se o desafio está cadastrado
            */
            if (!desafio) {

                throw new BadRequestException(`Desafio não cadastrado!`)

            }

            /*
                Somente podem ser atualizados desafios com status PENDENTE
            */
            if (desafio.status != StatusDesafio.PENDENTE) {

                throw new BadRequestException ('Somente desafios com status PENDENTE podem ser atualizados!')

            }

            await this.clientDesafios.emit('atualizar-desafio', { id: _id, desafio: atualizarDesafioDto } )

        }    

   @Post('/:desafio/partida/')
   async atribuirDesafioPartida(
       @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
       @Param('desafio') _id: string) {
            
        const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

        this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
        /*
            Verificamos se o desafio está cadastrado
        */
        if (!desafio) {

            throw new BadRequestException(`Desafio não cadastrado!`)

            }

        /*
            Verificamos se o desafio já foi realizado
        */

        if (desafio.status == StatusDesafio.REALIZADO) {
           
            throw new BadRequestException(`Desafio já realizado!`)
            
        }

        /*
            Somente deve ser possível lançar uma partida para um desafio
            com status ACEITO
        */

        if ( desafio.status != StatusDesafio.ACEITO) {

            throw new BadRequestException(`Partidas somente podem ser lançadas em desafios aceitos pelos adversários!`)

        }

        /*
            Verificamos se o jogador informado faz parte do desafio
        */
        /*if (!desafio.jogadores.includes(atribuirDesafioPartidaDto.def)) {

            throw new BadRequestException(`O jogador vencedor da partida deve fazer parte do desafio!`)

        }*/

        /*
            Criamos nosso objeto partida, que é formado pelas
            informações presentes no Dto que recebemos e por informações
            presentes no objeto desafio que recuperamos 
        */
        const partida: Partida = { } 
        partida.categoria = desafio.categoria
        partida.def = atribuirDesafioPartidaDto.def
        partida.desafio = _id
        //partida.jogadores = desafio.jogadores
        partida.resultado = atribuirDesafioPartidaDto.resultado

        /*
            Enviamos a partida para o tópico 'criar-partida'
            Este tópico é responsável por persitir a partida na 
            collection Partidas
        */
        await this.clientDesafios.emit('criar-partida', partida)
   
    }

   @Delete('/:_id')
   async deletarDesafio(
       @Param('_id') _id: string) {
            
        const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

        this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
        /*
            Verificamos se o desafio está cadastrado
        */
        if (!desafio) {

            throw new BadRequestException(`Desafio não cadastrado!`)

        }

           await this.clientDesafios.emit('deletar-desafio', desafio )
    
        }

}