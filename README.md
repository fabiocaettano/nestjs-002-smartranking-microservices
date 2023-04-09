 # NestJs - App SmartRanking - Microservices


## Pré-Requisitos


## Provisionar Máquinas Virtuais com TerraForm

1. Preencher o arquivo bloco-variable.tf:

1.1 Com o token gerado no site da digital ocean;

1.2 Com a chave ssh.


2. O comando abaixo irá provisionar 05 máquinas virtuais.

```
$ terraform init
$ terraform apply
```

3. Configuração:

Sistema Operacional Ubuntu 20.4;

Memória 02 GB;

CPU 1;

50 GB de HardDisk.


4. Utilização das máquinas:

labs-0: Executar o RabbitMq para o serviço de mensageria;

labs-1: Executará o projeto api-gateway.

labs-2: Executar o microserviço micro-admin-backend;

labs-3: 

labs-4:


## Conexão SSH


Na máquina local gerar chave ssh:

```
ssh-keygen -t id_key_ansible - C "informe um valor"
Enter passphrase:
Enter sama passprahse again:
```

Acessar a máquina virtual:

```
ssh root@ip-Do-labs-0

# informe yes
The authenticity of host '159.223.98.207 (159.223.98.207)' can't be established.
ECDSA key fingerprint is SHA256:a/I1Mb0Tvs9ZlvF4w1Or/XjIPvDxsmzWFoBbr5toq0Q.
Are you sure you want to continue connecting (yes/no/[fingerprint])?

# Estará logado na máquina virtual
# No prompt da máquina virtual digite exit

exit
```

Repetir o processo para as outras máquinas.

Copiar a chave pública da máquina local para virtual:

```
ssh-copy-id -i ~/.ssh/id_key_ansible.pub ip-Do-labs-0
Digite passphase:
ssh-copy-id -i ~/.ssh/id_key_ansible.pub ip-Do-labs-1
Digite passphase:
ssh-copy-id -i ~/.ssh/id_key_ansible.pub ip-Do-labs-2
Digite passphase:
ssh-copy-id -i ~/.ssh/id_key_ansible.pub ip-Do-labs-3
```




Conectar

```
$ ssh-agent bash
$ ssh-add ~/.ssh/id_rsa
$ informar a senha:
```


## Configurar o Ambiente com Ansible

1. Arquivo de inventário:

3. Executar o playbook;

```
$ ansible-playbook ~/caminho/playbook/set-up-envinroment.yml -i ~/caminho/hosts/inventory.txt -u root
```



## RabbitMq

1. Para gerenciar o RabbitMq acessar a página http://ip:15672/ com as credencias que constam no arquivo docker-compose.

2. Criar um Virtual Hosts na opção "Admin >> Virtual Hosts >> Preencher o campo "Name" com o valor "smartranking" >> Add virtual host".


