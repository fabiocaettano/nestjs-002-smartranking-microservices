# Executar Projeto

1. Provisionar máquinas:

``` bash
cd iac\terraform

# informar yes para o questionamento
terraform apply
```

O comando acima irá retornar 05 IP´s.

| Droplet | Finalidade                         |
| ------- | ---------------------------------- |
| labs-0  |  RabbitMq                          |
| labs-1  |  Api-Gateway                       |
| labs-2  |  MicroServices Micro-Admin-Backend |
| labs-3  |  MicroServices Desafios e Partida  | 
| labs-4  |  MicroServices Ranking             |

2. Configuar o arquivo de inventário.

| Droplet | group_01 | group_02 | group_03 | group_04 | group_05 | group_06 | group_07 |
| ------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| labs-0  |          |   Sim    |  Sim     |          |          |          |          | 
| labs-1  |  Sim     |   Sim    |          |  Sim     |          |          |          | 
| labs-2  |  Sim     |   Sim    |          |          | Sim      |          |          | 
| labs-3  |  Sim     |   Sim    |          |          |          | Sim      |          | 
| labs-4  |  Sim     |   Sim    |          |          |          |          | Sim      | 

| Group | Ação            
|   01  | Instalação NodeJs e NestJS 
|   02  | Instalação Aptitude, Docker,Docker-compose
|   02  | Clonar Repositório
|   03  | Checkout na branch rabbitmq, e executar docker-compose para iniciar RabbitMq
!   04  | Checkout na branch micro-admin-backend 
|   04  | Executar o micro-serviço micro-admin- 
