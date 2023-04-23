output "droplet_ip" {
  value = {
    for droplet in digitalocean_droplet.labs:
    droplet.name => droplet.ipv4_address
  }
}
