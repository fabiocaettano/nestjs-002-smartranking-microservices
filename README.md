# NestJs - App SmartRanking - Microservices


## Máquinas Virtuais

Criar 03 máquinas virtuais com a seguinte configuração.

1. Sistema Operacional Ubuntu 20.4;
2. Memória 02 GB;
3. CPU 1;
4. 50 GB de HardDisk.

Utilização das máquinas:

1. Máquina 1: Executar o RabbitMq para o serviço de mensageria;


2. Máquina 2: Executará o projeto api-gateway.

Este projeto é responsável por enviar mensagens para um tópico.

Através da camada de transporte RMQ , e o evento emit da classe ClienteProxyFactory.

Estas mensagens ficarão armazenadas em uma fila (queue), aguardando ser consumidas.


3. Máquina 3: Executar o projeto micro-admin-backend;



## Preparar Ambiente Máquina 2 e 3

``` bash
# clone do projeto 
git clone https://github.com/fabiocaettano/nestjs-002-smartranking-microservices.git

# instalar NVM, Docker e Docker-Compose 
cd nestjs-002-smartranking-microservices
. install.sh

# Instalar o framework Nestjs
npm i -g @nestjs/cli

# Iniciar o rabbigmq
cd rabbitmq
docker-compose up -d --build

# iniciar o api-gateway
cd api-gateway
npm install
npm run start:dev

# iniciar o micro-admin-backend
cd micro-admin-backend
npm install
npm run start:dev
```

## Dependências Instaladas no Projeto

### Máquina 2
1. @nestjs/microservices;
2. amqplib;
3. amqp-connection-manager;
4. moment-timezone;
5. class-validator;
6. class-transformer;
7. dotenv

### Máquina 2
1. @nestjs/microservices;
2. amqplib;
3. amqp-connection-manager;
4. @nestjs/mongoose
5. mongoose 
6. npm install --save-dev @types/mongoose 
7. dotenv

## RabbitMq

1. Para gerenciar o RabbitMq acessar a página http://ip:15672/ com as credencias que constam no arquivo docker-compose.

2. Criar um Virtual Hosts na opção "Admin >> Virtual Hosts >> Preencher o campo "Name" com o valor "smartranking" >> Add virtual host".

