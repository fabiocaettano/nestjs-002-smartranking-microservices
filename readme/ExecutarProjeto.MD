# Executar Projeto

## 1.0 TerraForm

### 1.1 Provisionar máquinas:

Executar Projeto:

``` bash
cd iac\terraform
terraform apply
Enter a value: yes
```

Resultado:

```
Outputs:

droplet_api = {
  "labs-api-0" = "0.0.0.2"
}
droplet_microservico = {
  "labs-microservico-0" = "0.0.0.3"
  "labs-microservico-1" = "0.0.0.4"
  "labs-microservico-2" = "0.0.0.5"
}
droplet_rabbitmq = {
  "labs-rabbitmq-0" = "0.0.0.1"
}
```

## 2.0 Ansible

### 2.1 Arquivo De Inventário

Distribuir os IPs gerados pelo Terraform no arquivo de inventário do Ansible.

O arquivo está no diretório `ansible >> hosts >> inventory.ini`. 

Configurar conforme tabela abaixo :

| Name Droplet        | IP      |  Hosts                 |   Observação                      |
| ------------------- | ------- | -----------------------| --------------------------------- | 
| labs-rabbitmq-0     | 0.0.0.1 | group_02 , group_03    |  RabbitMq                         |
| labs-api-0          | 0.0.0.2 | group_01 , group_02 ,  |  Api-GateWay                      |
|                     |         | group_04               |                                   | 
| labs-microservico-0 | 0.0.0.3 | group_01 , group_02 ,  |  MicroServiço micr0-admin-backend | 
|                     |         | group_05               |                                   | 
| labs-microservico-1 | 0.0.0.4 | group_01 , group_02 ,  |  MicroServiço desafios            | 
|                     |         | group_06               |                                   | 
| labs-microservico-2 | 0.0.0.5 | group_01 , group_02 ,  |  MicroServiço ranking             |
|                     |         | group_07               |                                   |


### 2.2 Configuração Ansible:

```
touch ansible/ansible.cfg

echo [defaults] > ansible/ansible.cfg
echo "host_key_checkins=False" >> ansible/ansible.cfg
```

### 2.3 Configurar variáveis de ambiente 

Confirar no arquivo `hosts/inventory.ini`, e nos nos hosts: group_04, group_05, group_06 e group_07.
Informar as credenciais para o RabbitMq, AWS , MongoDB. E outras configurações.


### 2.4 Testar Conexão

Executar comando ping:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/ping.yml -i hosts/inventory.ini -u root
```

### 2.5 Configurar ambiente:

Executar comando:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/setup.yml -i hosts/inventory.ini -u root
```

## 3.0 RabbitMq

### 3.1 Virtual Host

Acessar o site do RabbitMQ `http://0.0.0.1:15762`.

Criar o **virtual host** na opção aba `Admin >> Virtual Hosts >> Add a new virtual host >>`, no campo `Name` preencher com o seguinte valor: **smartranking**.

## 4.0 Conexão do MongoDB.

### 4.1 Base de Dados Micro-Admin-Backend

Acessar a máquina virtual:

```
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ssh root@0.0.0.3
```

No maquina virtual:

```
docker container ls
docker exec -it mongodb /bin/bash
```

No container da máquina virtual:

```
mongosh -u ["User que consta no  Docker-Compose"] -p ["Password que consta no  Docker-Compose"]

use smartranking_admin;

db.createUser({user: ["User que consta no  Docker-Compose"], pwd: ["Password que consta no  Docker-Compose"], roles: [{role: "readWrite", db: "smartranking_admin"}]});
```

### 4.2 Base de Dados Micro-Desafios

Acessar a máquina virtual:

```
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ssh root@0.0.0.4
```

No maquina virtual:

```
docker container ls
docker exec -it mongodb /bin/bash
```

No container da máquina virtual:

```
mongosh -u ["User que consta no  Docker-Compose"] -p ["Password que consta no  Docker-Compose"]

use smartranking_admin;

db.createUser({user: ["User que consta no  Docker-Compose"], pwd: ["Password que consta no  Docker-Compose"], roles: [{role: "readWrite", db: "smartranking_admin"}]});
```
