# Set the variable value in *.tfvars file
# or using the -var="hcloud_token=..." CLI option
variable "hcloud_token" {
  sensitive = true # Requires terraform >= 0.14
}

variable "fingerprint" {
  default = "b0:79:32:50:66:1b:91:40:e6:99:be:4b:48:9d:c0:3d"
}

variable "server_location" {
  default = "fsn1"
}

variable "server_tier" {
  default = "cx21"
}

variable "server_snapshot" {
  default = "docker-minecraft"
}

variable "ssh_private_key" {
  default = "/Users/saezgutierrezjuanpablo/.ssh/id_rsa"
}

variable "java_m" {
  default = "3000M"
}

variable "game_server_repository" {
  default = "https://github.com/Zenidd/DockerMinecraft.git"
}

variable "server_name" {
  default = "minecraft"
}

