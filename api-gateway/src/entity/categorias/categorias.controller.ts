import { Body, Controller , Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria-dto';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { ProxyClient } from 'src/proxy/proxy-client';
require('dotenv').config({ path: '.env' })


@Controller('api/v1')
export class CategoriaController {  

    private logger = new Logger(CategoriaController.name);    

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

    @Post('categorias')
    @UsePipes(ValidationPipe)
    criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ){  
        this.clientAdminBackend.emit('criar_categoria', criarCategoriaDto);
    }

    @Get('categorias')
    consultaCategorias(@Query('categoria') categoria : string): Observable<any>{        
        return this.clientAdminBackend.send('consultar-categorias','');       
    }        

    @Get('categorias/:_id/id')
    consultaCategoriaPeloId(@Param('_id') _id : string): Observable<any>{        
        //return this.clientAdminBackend.send('consultar-categoria-pelo-id',categoria);       
        const result = this.clientAdminBackend.send('consultar-categoria-pelo-id',_id);       
        this.logger.log(`result categoria id: ${result.forEach( item => item._id)}`)
        return result;
    }

    @Get('categorias/:categoria/categoria')
    consultaCategoriaPelaDescricao(@Param('categoria') categoria : string): Observable<any>{        
        //return this.clientAdminBackend.send('consultar-categoria-pelo-id',categoria);       
        return this.clientAdminBackend.send('consultar-categoria-pela-descricao',categoria);       
    }

    @Put('categorias/:categoria')
    @UsePipes(ValidationPipe)
    atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria : string){
        this.clientAdminBackend.emit('atualizar-categoria',{categoria: categoria, atualizar_categoria: atualizarCategoriaDto});
    }
}
