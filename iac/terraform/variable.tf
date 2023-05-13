variable "chave_ssh" {
  default     = "kubedev"
  description = "Chave SSH"
}

variable "token" {
  default     = ["Obter o Token no site da Digital Ocean"]
  description = "Token de acesso a Digital Ocena"
}

variable "regiao" {
  default     = "nyc1"
  description = "Região de uso na Digital Ocean"
}

variable "imagem" {
  default     = "ubuntu-20-04-x64"
  description = "Selecionar Sistema Operacional"
}

variable "size_1" {
  default     = "s-1vcpu-2gb"
  description = "Definir Proessador, CPU e tamnahdo do disco"
}

variable "size_2" {
  default     = "s-1vcpu-1gb-intel"
  description = "Definir Proessador, CPU e tamnahdo do disco"
}