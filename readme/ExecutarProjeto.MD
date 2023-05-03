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
  "labs-api-0" = "0.0.0.0"
}
droplet_microservico = {
  "labs-microservico-0" = "0.0.0.0"
  "labs-microservico-1" = "0.0.0.0"
  "labs-microservico-2" = "0.0.0.0"
}
droplet_rabbitmq = {
  "labs-rabbitmq-0" = "0.0.0.0"
}
```

## 2.0 Ansible

### 2.1 Arquivo De Inventário

Distribuir os IPs gerados pelo Terraform no arquivo de inventário do Ansible.

O arquivo está no diretório `ansible >> hosts >> inventory.ini`. 

Configurar conforme tabela abaixo :

|   IP                |   Hosts                          |   Observação                      |
| ------------------- | -------------------------------- |  -------------------------------- | 
| labs-rabbitmq-0     | group_02 , group_03              |  RabbitMq                         |
| labs-api-0          | group_01 , group_02 , group_04   |  Api-GateWay                      |
| labs-microservico-0 | group_01 , group_02 , group_05   |  MicroServiço micr0-admin-backend | 
| labs-microservico-1 | group_01 , group_02 , group_06   |  MicroServiço desafios            | 
| labs-microservico-2 | group_01 , group_02 , group_07   |  MicroServiço ranking             |


### 2.2 Configuração Ansible:

```
touch ansible/ansible.cfg

echo [defaults] > ansible/ansible.cfg
echo "host_key_checkins=False" >> ansible/ansible.cfg
```

### 2.3 Configurar variáveis de ambiente 

Arquivo `playbooy/setup.yml` 

Nos hosts: **group_04** e **group_05**.

Group_04:

``` yaml
...
hosts: group_04
  vars:    
    folder: "nestjs-002-smartranking-microservices"    
    branch: "api-gateway"
    rabbitmq_user: ""
    rabbitmq_password: ""
    rabbitmq_ip: "informar ip do labs-rabbitmq-o"
    rabbitmq_port: 5672
    rabbitmq_virtual_host: "smartranking"
    AWS_ENDPOINT: ""
    AWS_URL: ""
    AWS_BUCKET: ""
    AWS_REGION: ""
    AWS_SPACES_KEY: ""
    AWS_SPACES_SECRET: ""
...
```

Group_05:

``` yaml
...
hosts: group_05
  vars:    
    folder: "nestjs-002-smartranking-microservices"    
    branch: "micro-admin-backend"    
    rabbitmq_user: ""
    rabbitmq_password: ""
    rabbitmq_ip: "informar ip do labs-rabbitmq-o"
    rabbitmq_port: 5672
    rabbitmq_virtual_host: "smartranking"
    mongodb_db_name: "smartranking_admin"
    mongodb_ip: "informar ip do labs-microservico-o"
    mongodb_port: 27017
    mongodb_user: ""
    mongodb_password: ""
```

### 2.4 Testar Conexão

Executar comando ping:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/ping.yml -i hosts/inventory.txt -u root
```

### 2.5 Configurar ambiente:

Executar comando:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/setup.yml -i hosts/inventory.txt -u root
```

## 3.0 RabbitMq

### 3.1 Virtua. Host

Acessar o site do RabbitMQ `http://ip-do-labs-0:15762`.

Criar o **virtual host** na opção aba `Admin >> Virtual Hosts >> Add a new virtual host >>`, no campo `Name` preencher com o seguinte valor: **smartranking**.

## 4.0 Testar conexão do MongoDB.

utilizar os IPs do labs-2, labs-3 e labs-4.


