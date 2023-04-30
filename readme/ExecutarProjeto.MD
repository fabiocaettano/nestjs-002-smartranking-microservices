# Executar Projeto

1. Provisionar máquinas:

``` bash
cd iac\terraform
terraform apply
yes
```

2. Distribuir os IPs gerados pelo Terraform no arquivo de inventário que fica em `ansible >> hosts >> inventory`. Conforme tabela abaixo :

|   IP   |   Hosts                          |   Observação                      |
| ------ | -------------------------------- |  -------------------------------- | 
| labs-0 | group_02 , group_03              |  RabbitMq                         |
| labs-1 | group_01 , group_02 , group_04   |  Api-GateWay                      |
| labs-2 | group_01 , group_02 , group_05   |  MicroServiço micr0-admin-backend | 
| labs-3 | group_01 , group_02 , group_06   |  MicroServiço desafios            | 
| labs-4 | group_01 , group_02 , group_07   |  MicroServiço ranking             |


3. Configuração Ansible:

```
touch ansible/ansible.cfg

echo [defaults] > ansible/ansible.cfg
echo "host_key_checkins = False" >> ansible/ansible.cfg
echo "ansible_user = root" >> ansible/ansible.cfg
```

4. Configurar variáveis de ambiente no arquivo `playbooy/setup.yml` 

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
    rabbitmq_ip: ""
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
    rabbitmq_ip: ""
    rabbitmq_port: 5672
    rabbitmq_virtual_host: "smartranking"
    mongodb_db_name: "smartranking_admin"
    mongodb_ip: ""
    mongodb_port: 27017
    mongodb_user: ""
    mongodb_password: ""
```

5. Configurar ambiente:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/setup.yml -i hosts/inventory.txt -u root
```

6. Acessar o site do RabbitMQ `http://ip-do-labs-0:15762`.
E criar o um virtual host.

7. Testar conexão do MongoDB.

utilizar os IPs do labs-2, labs-3 e labs-4.


