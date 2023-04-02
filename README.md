# NestJs - App SmartRanking - Microservices

## Projeto Micro-Admin-Backend

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


