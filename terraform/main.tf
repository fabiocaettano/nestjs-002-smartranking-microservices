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

resource "digitalocean_droplet" "labs" {
  count    = 4
  image    = var.imagem
  name     = "labs-${count.index}"
  region   = var.regiao
  size     = var.size
  ssh_keys = [data.digitalocean_ssh_key.minha_chave.id]
  tags = [
    "kubedev"
  ]
}

data "digitalocean_ssh_key" "minha_chave" {
  name = var.chave_ssh
}