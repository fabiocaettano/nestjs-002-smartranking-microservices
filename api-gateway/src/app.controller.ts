import { Body, Controller , Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria-dto';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
require('dotenv').config({ path: '.env' })


@Controller('api/v1')
export class AppController {  

    private logger = new Logger(AppController.name);

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

    @Get('categorias/:categoria')
    consultaCategoriaPeloId(@Param('categoria') categoria : string): Observable<any>{        
        return this.clientAdminBackend.send('consultar-categoria-pelo-id',categoria);       
    }

    @Put('categorias/:categoria')
    @UsePipes(ValidationPipe)
    atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria : string){
        this.clientAdminBackend.emit('atualizar-categoria',{categoria: categoria, atualizar_categoria: atualizarCategoriaDto});
    }
}
