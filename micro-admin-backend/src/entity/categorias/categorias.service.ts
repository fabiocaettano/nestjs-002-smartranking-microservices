import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoriasService {
  
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ){}

  private readonly logger =  new Logger(CategoriasService.name)

  async criarCategoria(categoria: Categoria): Promise<Categoria>{

    try{
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();

    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }
  }

  async consultarTodasCategorias() : Promise<Categoria[]>{
    try{
      return await this.categoriaModel.find().exec();
    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }
  }

  async consultarCategoriaPeloId(_id: string) : Promise<Categoria>{
    try{
      return await this.categoriaModel.findOne({_id}).exec();
    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }

  }

  async consultarCategoriaPelaDescricao(categoria: string) : Promise<Categoria>{
    try{
      return await this.categoriaModel.findOne({categoria}).exec();
    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }

  }

  async atualizarCategoria(categoria: string, atualizar_categoria: Categoria): Promise<void>{

    try{
      await this.categoriaModel.findOneAndUpdate({categoria},{$set: atualizar_categoria}).exec()
    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }

  }
}
