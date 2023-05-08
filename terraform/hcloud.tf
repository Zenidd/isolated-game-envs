#Install hcloud provider
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "1.38.2"
    }
  }
}

# Configure the Hetzner Cloud Provider
provider "hcloud" {
  token = var.hcloud_token
}

# Obtain ssh key data
data "hcloud_ssh_key" "ssh_key" {
  fingerprint = var.fingerprint
}

#Select snapshot
data "hcloud_image" "docker_image" {
  with_selector = "docker-minecraft"
}

# Create the server
resource "hcloud_server" "node1" {
  name        = var.server_name
  image       = data.hcloud_image.docker_image.id
  server_type = var.server_tier
  ssh_keys    = ["${data.hcloud_ssh_key.ssh_key.id}"]
  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }

  provisioner "remote-exec" {
    inline = [
      "git clone ${var.game_server_repository} server && cd server",
      "docker-compose up -d"
    ]

    connection {
      host        = hcloud_server.node1.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = file(var.ssh_private_key)
    }
  }


}

# Output Server Public IP address 
output "server_ip_node1" {
  value = hcloud_server.node1.ipv4_address
}
