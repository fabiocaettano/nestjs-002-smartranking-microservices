output "droplet_rabbitmq" {
  value = {
    for droplet in digitalocean_droplet.labs-rabbitmq:
    droplet.name => droplet.ipv4_address
  }
}


output "droplet_api" {
  value = {
    for droplet in digitalocean_droplet.labs-api:
    droplet.name => droplet.ipv4_address
  }
}


output "droplet_microservico" {
  value = {
    for droplet in digitalocean_droplet.labs-microservico:
    droplet.name => droplet.ipv4_address
  }
}
