provider "digitalocean" {
  token = var.token
}

terraform {
  required_version = ">1.0.0"
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.16.0"
    }
  }
}

resource "digitalocean_droplet" "labs-rabbitmq" {
  count    = 1
  image    = var.imagem
  name     = "labs-rabbitmq-${count.index}"
  region   = var.regiao
  size     = var.size_1
  ssh_keys = [data.digitalocean_ssh_key.minha_chave.id]
}

resource "digitalocean_droplet" "labs-api" {
  count    = 1
  image    = var.imagem
  name     = "labs-api-${count.index}"
  region   = var.regiao
  size     = var.size_1
  ssh_keys = [data.digitalocean_ssh_key.minha_chave.id]
}

resource "digitalocean_droplet" "labs-microservico" {
  count    = 3
  image    = var.imagem
  name     = "labs-microservico-${count.index}"
  region   = var.regiao
  size     = var.size_1
  ssh_keys = [data.digitalocean_ssh_key.minha_chave.id]
}

data "digitalocean_ssh_key" "minha_chave" {
  name = var.chave_ssh
}