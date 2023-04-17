 # NestJs - App SmartRanking - Microservices


## 1.0 Pré-Requisitos


## 2.0 Provisionar Máquinas Virtuais

Utilizei a solução TerraForm para provisionar os droplets (máquinas virtuais) no serviço da Digital Ocean.

Como requisito para provisionar os droplets é necessário gerar **token** e **chave SSK KEY** no site da **Digital Ocean**.


### 2.1.1 Token

Para gerar o token utilizar a opção *API >> Aba Token >> Utilizar a opção "Generated Token"* , no site da Digital Ocean.


### 2.2.1 SSH KEY

Abra o terminal na máquina local.

Gerar a chave:

```
ssh-keygen
```

No prompt digite o nome da chave:

```
Generating public/private rsa key pair. 
Enter file in which to save the key (/Users/USER/.ssh/id_rsa): NOME_DA_CHAVE
```

É altamente recomendado registrar uma frase para chave (senha).

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Copiar a informação abaixo:

```
cat ~/.ssh/id_rsa.pub
```

Acessar o site da Digital Ocean em "Settings >> Aba Security >> Add SSH Key" , no campo **SSH Key Content**, colar as informações do arquivo **id_rsa.pub** gerado na máquina local. E no campo **Name**, informe o "NOME DA CHAVE". Para confirmar clicar em "Add SSH Key".


### 2.3.1 Configurar arquivo bloco-variable.tf

No arquivo **terraform >> bloco-variable.tf**, informar o token e a chave ssh-key.

``` yaml
variable "chave_ssh" {
  default     = ""
  description = "Chave SSH"
}

variable "token" {
  default     = ""
  description = "Token de acesso a Digital Ocena"
}
```

### 2.3.2 Número de máquinas virtuais

No arquivo **terraform >> main.tf**, na chave **digitialocean_droplet** em **count** informar o total de máquinas desejadas.

Neste projeto serão utilizados 5 máquinas virtuais.

``` yaml
resource "digitalocean_droplet" "labs" {
  count    = 5
  image    = var.imagem
  name     = "labs-${count.index}"
  region   = var.regiao
  size     = var.size
  ssh_keys = [data.digitalocean_ssh_key.minha_chave.id]
  tags = [
    "kubedev"
  ]
}
```

### 2.3.3 Configuração das máquinas virtuais

Configuração:

- Sistema Operacional Ubuntu 20.4;
- Memória 02 GB;
- CPU 1;
- 50 GB de HardDisk.


### 2.3.4 Criar as máquinas virtuais

Para criar as máquinas virtuais executar os seguintes comandos:

```
$ terraform init
$ terraform validate
$ terraform apply
```

### 2.3.5 Utilização das máquinas:

- labs-0: Executar o RabbitMq para o serviço de mensageria;

- labs-1: Executará o projeto api-gateway.

- labs-2: Executar o microserviço micro-admin-backend;

- labs-3: Executar o microserviço desafios;

- labs-4: Executar o microserviço ranking.


## 3.0 Conexão SSH

Acessar cada máquina virtual gerada pelo TerraForm.

Esta etapa é necessária para que possamos configurar as máquinas com o Ansible.

Executar o comando abaixo na máquina local para cada máquina virtual

Exemplo com o ip da máquina labs-0:

```
ssh root@ip-Do-labs-0

# informe yes
The authenticity of host '159.223.98.207 (159.223.98.207)' can't be established.
ECDSA key fingerprint is SHA256:a/I1Mb0Tvs9ZlvF4w1Or/XjIPvDxsmzWFoBbr5toq0Q.
Are you sure you want to continue connecting (yes/no/[fingerprint])?

# Digite a frase da chave criada na fase do SSH KEY:
Enter passphrase for key '/home/fabio/.ssh/id_rsa':

# Estará logado na máquina virtual
# No prompt da máquina virtual digite exit

exit
```

Repetir o processo para labs-1, labs-2, labs-3 e labs-4.


## 4.0 Configurar o Ambiente com Ansible

### 4.1.1 Arquivo de inventário

No arquivo de inventário informaos os IP's gerados pelo TerraForm.

No arquivo **hosts >> inventory.txt** os IP´s foram dividios em 06 grupos. Conformer tabela abaixo:


| Grupo | Hosts     | Total de Ips | Nome das Máquinas      | Instalação/Executar              | 
|-------|-----------|--------------|------------------------|----------------------------------|
|   1   | group_01  |      3       | labs-1, labs-2 e lab-3 | NVM e o do NODE                  |  
|   2   | group_02  |      4       | labs-0, labs-1, labs-2 | Docker, Docker-Compose           |
|       |           |              | e labs-3               | e Git Clone                      |
|   3   | group_03  |      1       | labs-0                 | RabbitMq                         |  
|   4   | group_04  |      1       | labs-1                 | Api-Gateway                      |  
|   5   | group_05  |      1       | labs-2                 | MicroServiço micro-admin-backend |
|   6   | group_06  |      1       | labs-3                 | MicroServiço Desafios            |  
|   7   | group_07  |      1       | labs-4                 | MicroServiço Rankings            |  


### 4.1.2 Playbook

Executar playbook na máquina local:

```
ssh-agent bash
ssh-add ~/.ssh/id_rsa
informar a senha:
ansible-playbook ~/caminho/playbook/set-up-envinroment.yml -i ~/caminho/hosts/inventory.txt -u root
```



## 5.0 RabbitMq

- Para gerenciar o RabbitMq acessar a página http://ip-labs-0:15672/ com as credencias que constam no arquivo docker-compose.

- Na página do RabbiMq criar um Virtual Hosts na opção:
 "Admin >> Virtual Hosts >> Preencher o campo "Name" com o valor "smartranking" >> Add virtual host".


## 6.O NestJs

Instalar Nest js globalmente, nas máquinas labs-1, labs-2, labs-3 e labs-4.

```
npm i -g @nestjs/cli
```

## 7.0 Dependências

- Acessar labs-1 e acessar o diretório do microserviço:

```
ssh root@ip-labs-1

cd api-gateway

npm install
```

- Acessar labs-2 e acessar o diretório do microserviço:

```
ssh root@ip-labs-2

cd micro-admin-backend

npm install
```


- Acessar labs-3 e acessar o diretório do microserviço:

```
ssh root@ip-labs-2

cd desafios

npm install
```

### 8.0 Configurar VS Code

Utilizar o recurso **Remote Explorer**.

Em *Remote >> SSH >> Open SSH Config File*, selecione *.ssh/config*.

Configure o arquivo:

``` vscode
Host rabbitmq
  HostName 134.209.66.243
  User root

Host api-gateway
   HostName 134.209.70.112
   User root 

Host micro-admin-backend
   HostName 134.209.76.177 
   User root 

Host desafios
   HostName 68.183.29.71    
   User root
```

Fechar o arquivo e salvar.

Clicar em *Remote e Refresh*.

Selecione uma máquina virtual para acessar.


### 9.0 Variáveis de Ambiente

- MicroServiço api-gateway:

``` env
RABBITMQ_URI=amqp://user:password@ip-labs-0/smartranking
AWS_ENDPOINT=https://nyc3.digitaloceanspaces.com/
AWS_URL=https://smartranking.nyc3.digitaloceanspaces.com/
AWS_BUCKET=smartranking
AWS_REGION=us-east-1
AWS_SPACES_KEY=**************
AWS_SPACES_SECRET=***********************
```

- MicroServiço micro-admin-backend:

```
RABBITMQ_URI=amqp://user@password@ip-labs-0:5672/smartranking
MONGO_URI=mongodb://ip-labs-2:27017/smartranking
MONGO_USER=********
MONGO_PASSWORD=********
```

## 10.0 NestJS

Iniciar o serviço nas máquinas labs-1, labs-2, labs-3 e labs-4.

```
npm run start:dev
```

## 11.0 Insomnia

Configurar o BaseEnvironment, utilizando a opção Manage Environment.

Informar o IP do api-gateway:

``` json
{
	"url_api_gateway": "http://ip-labs-1:8080/"
}
``` 

Nos endpoints ao invés de informarmos "http://ip:porta", colocamos um alias que no caso seria _uri_api_gateway.

Exemplo:
```
{{ _.url_api_gateway }}api/v1/categorias
```

## 12 IDE Banco de Dados

Para visualizar as requisições na base de dados:

No aplicativo Robo 3T, informar o IP do micro serviço micro-admin-backend, com a porta 27017.

