# Provisionar Máquina

## 1.0 Pré-Requisito

Terraform esteja instalado.

Dica de instalação:

- Acessar o site [TerraForm](https://www.terraform.io/) para realizar o download.

- Realizar o Download na opção Editions >> TerraForm CLI >> Download >> Linux >> Amd64

- Instalar:

``` bash
sudo apt update
sudo unzip -o terraform_1.3.2_linux_amd64.zip -d /usr/local/bin
```

- Checar a versão:

``` bash
terraform --version
```

## 2.0 Variable.tf

Neste projeto foi utilizado o serviço da **Digital Ocean** para criar os Droplets.

Os Droplets são máquinas virtuais.

Os Droplets foram provisionados com a ferramenta **TerraForm**.

Para criar uma máquina virtual no serviço da Digital Ocean é necessário as seguintes informações:
- Chave SSH;
- Token;
- Regions;
- Sizes;
- Distro Images.


1. A **Chave SSH** é gerada no seguinte caminho `Settings >> Aba Security >> Botão Add SSH Key`;
O nome da chave ssh será utilizado no arquivo variable.tf.

2. O **Token** é gerado no seguinte caminho  `Menu Api >> Tokens >> Generate New Token`.

3. A informação da Region, Size e da Distro é obtida no [Site](https://slugs.do-api.dev/).

A Region selecionada foi a **nyc1** na aba `Regions`.

O Size selecionado foi o **s-1vcpu-2gb** na aba `Droplet Sizes`.

A Distro Images seleciona foi a **ubuntu-20-04-x64** na aba `Distro Images`.


Esass informações do item 1,2 e 3 serão utilizadas no arquivo `iac >> terraform >> variable.tf` e inseridas na valor **default** do seu respectiva chave.




## 3.0 Main.tf

No arquivo `iac >> terraform >> main.tf` é responsável por realizar o provisionamento dos droplets.

Para mais detalhes utilizar o [site registry](https://registry.terraform.io/)

No campo "Search" pesquise por digitalocean. Selecione digitalocean/digitalocean. Depois clicar em "Documentation"


## 4.0 Provsionar os Droplets:

O comando abaixo deve ser executao uma vez:

```
cd iac/terraform/
terraform init
```

Para provsionar os droplets:

```
terraform validate
terraform apply
```

Com a configuralçao do arquivo `iac >> terraform >> output.tf` será exibido o número dos IPs dos dropletes provisionados. Exemplo:

```
droplet_ip = {
  "labs-0" = "137.184.70.85"
  "labs-1" = "143.244.159.208"
  "labs-2" = "147.182.215.201"
  "labs-3" = "147.182.143.106"
  "labs-4" = "147.182.143.89"
}
```