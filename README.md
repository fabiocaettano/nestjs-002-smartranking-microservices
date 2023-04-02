# NestJs - App SmartRanking - Microservices

## Projeto Micro-Admin-Backend

### Variáveis de Ambiente

Criar o arquivo ".env" na raiz do projeto.

No conteúdo do arquivo ".env" informe as redencias:

```
RABBITMQ_URI=amqp://user:password@ipDoRabbitMq/virtualHost
MONGO_URI=mongodb://db:27017/nomeDoBanco
MONGO_USER=user
MONGO_PASSWORD=password
```
*** virtualHost neste projeto é o smartranking
*** nomedoBanco neste projeto é o smartranking
*** o db utilizado na chave MONGO_URI é o serviço do docker-compose


### Preparar Ambiente

``` bash
# clone do projeto 
git clone https://github.com/fabiocaettano/nestjs-002-smartranking-microservices.git
cd nestjs-002-smartranking-microservices

# fazer o checkout
git branch -a
git checkout -b micro-admin-backend origin/micro-admin-backend

# instalar NVM, Docker e Docker-Compose 
. install.sh

# Instalar as dependências
npm install

# iniciar o micro-admin-backend
docker-compose up -d --build
docker container ls
docker logs idDoContainer
```


