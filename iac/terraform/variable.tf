variable "chave_ssh" {
  default     = ""
  description = "Chave SSH"
}

variable "token" {
  default     = ""
  description = "Token de acesso a Digital Ocena"
}


variable "regiao" {
  default     = "nyc1"
  description = "Região de uso na Digital Ocean"
}

variable "imagem" {
  default     = ""
  description = "Selecionar Sistema Operacional"
}

variable "size" {
  default     = ""
  description = "Definir Proessador, CPU e tamnahdo do disco"
}
