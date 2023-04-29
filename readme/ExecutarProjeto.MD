# Executar Projeto

1. Provisionar máquinas:

``` bash
cd iac\terraform

# informar yes para o questionamento
terraform apply
```

2. Atualizar Inventário:

Arquivo inventory:

```
[group_01]
ip do labs-1
ip do labs-2
ip do labs-3
ip do labs-4

[group_02]
ip do labs-0
ip do labs-1
ip do labs-2
ip do labs-3
ip do labs-4

[group_03]
ip do labs-1

[group_04]
ip do labs-2

[group_05]
ip do labs-3

[group_06]
ip do labs-4
```

3. Configuração Ansible:

```
cat ansible/ansible.cfg

[defaults]
host_key_checkins = False
ansible_user = root
```

4. Configurar variáveis de ambiente no arquivo `playbooy/setup.yml` nos hosts: **group_04** e **group_05**.



5. Configurar ambiente:

```
cd iac\ansible
ssh-agent bash
ssh-add ~/.ssh/id_rsa
ansible-playbook playbook/setup.yml -i hosts/inventory.txt 
```

6. Criar o Virtual Host "smartrankings" no site do RabbitMQ.

7. Testar conexão do MongoDB, utilizando os IPs do labs-2, labs-3 e labs-4.


