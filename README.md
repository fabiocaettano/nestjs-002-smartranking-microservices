 # NestJs - App SmartRanking - Microservices


## Pré-Requisitos


## Provisionar Máquinas Virtuais com TerraForm

1. Preencher o arquivo bloco-variable.tf:

a. Com o token gerado no site da digital ocean;
b. Com a chave ssh.


2. O comando abaixo irá provisionar 05 máquinas virtuais.

```
$ terraform init
$ terraform apply
```

3. Configuração:

a. Sistema Operacional Ubuntu 20.4;
b. Memória 02 GB;
c. CPU 1;
d. 50 GB de HardDisk.

4. Utilização das máquinas:

a. labs-0: Executar o RabbitMq para o serviço de mensageria;

b. labs-1: Executará o projeto api-gateway.

c. labs-2: Executar o microserviço micro-admin-backend;

d. labs-3: 

e. labs-4:


## Configurar o Ambiente com Ansible

1. Arquivo de inventário:


2. Conectar

```
$ ssh-agent bash
$ ssh-add ~/.ssh/id_rsa
$ informar a senha:
```

3. Executar o playbook;

```
$ ansible-playbook ~/caminho/playbook/set-up-envinroment.yml -i ~/caminho/hosts/inventory.txt -u root
```



## RabbitMq

1. Para gerenciar o RabbitMq acessar a página http://ip:15672/ com as credencias que constam no arquivo docker-compose.

2. Criar um Virtual Hosts na opção "Admin >> Virtual Hosts >> Preencher o campo "Name" com o valor "smartranking" >> Add virtual host".


