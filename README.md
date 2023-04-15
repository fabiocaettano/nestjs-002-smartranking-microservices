 # NestJs - App SmartRanking - Microservices


## 1.0 Pré-Requisitos


### 2.0 Provisionar Máquinas Virtuais

Utilizei a solução TerraForm para provisionar 04 máquina no serviço da Digital Ocean.

Necessário gerar um token e uma chave SSK KEY no site da **Digital Ocean**.


#### 2.1.1 Token

O token fia na opção "API >> Aba Token >> Utilizar a opção "Generated Token".

#### 2.2.1 SSH KEY

Abra o terminal na máquina local:

```
ssh-keygen
```

No prompet digite o nome da chave:

```
Generating public/private rsa key pair. Enter file in which to save the key (/Users/USER/.ssh/id_rsa): NOME_DA_CHAVE
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

Agora no site da Digital Ocean em "Settings >> Aba Security >> Add SSH Key".

No campo **SSH Key Content**, colar as informações do arquivo **id_rsa.pub** gerado na máquina local.

E no campo **Name**, informe o "NOME DA CHAVE".

Para confirmar clicar em "Add SSH Key".


### 2.3.1 Configurar arquivo bloco-variable.tf

No arquivo **terraform >> bloco-variable.tf**, informar o token e a chave ssh-key.

### 2.3.2 Número de máquinas virtuais

No arquivo main.tf, na chave digitialocean_droplet em count informar o total de máquinas desejadas.

Neste projeto será utilizado 5 máquinas virtuais.

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

O comando abaixo irá provisionar máquinas virtuais.

```
$ terraform init
$ terraform validate
$ terraform apply
```

### 2.3.5 Utilização das máquinas:

labs-0: Executar o RabbitMq para o serviço de mensageria;

labs-1: Executará o projeto api-gateway.

labs-2: Executar o microserviço micro-admin-backend;

labs-3: Executar o microserviço desafios;

labs-4: Executar o microserviço ranking.


### 3.0 Conexão SSH

Acessar cada máquina virtual gerada pelo TerraForm.

Esta etapa é necessária para que possamos configurar as máquinas com o Ansible.

Executar o comando abaixo na máquina local para cada máquina virtual

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

## 4.0 Configurar o Ambiente com Ansible

### 4.1.1 Arquivo de inventário

No arquivo de inventário informaos os IP's gerados pelo TerraForm.

No arquivo **hosts >> inventory.txt** os IP´s foram dividios em 06 grupos.

|-----------------------------------------------------------------------------|
| Grupo | Hosts     | Total de Ips | Instalação/Executar                      | 
|-------|-----------|--------------|------------------------------------------|
|   1   | group_01  |      3       | NVM e o do NODE                          |  
|-------|-----------|--------------|------------------------------------------|
|   2   | group_02  |      4       | Docker, Docker-Compose e Git Clone       |
|-------|-----------|--------------|------------------------------------------|


### 4.1.2 Playbook

Executar playbook:

```
ssh-agent bash
ssh-add ~/.ssh/id_rsa
informar a senha:
ansible-playbook ~/caminho/playbook/set-up-envinroment.yml -i ~/caminho/hosts/inventory.txt -u root
```



## RabbitMq

1. Para gerenciar o RabbitMq acessar a página http://ip:15672/ com as credencias que constam no arquivo docker-compose.

2. Criar um Virtual Hosts na opção "Admin >> Virtual Hosts >> Preencher o campo "Name" com o valor "smartranking" >> Add virtual host".


