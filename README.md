

## Preperar Ambiente

O script instala o NVM, Docker, Docker-Compose e o NestJS.

```
cd smartranking
. install.sh

npm i -g @nestjs/cli
```

## Dependências Instaladas no Projeto

``` bash
cd api-gateway

npm install @nestjs/microservices

npm install amqplib amqp-connection-manager

npm install moment-timezone

npm install class-validator class-transformer
```