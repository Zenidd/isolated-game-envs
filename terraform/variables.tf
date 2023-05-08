# Set the variable value in *.tfvars file
# or using the -var="hcloud_token=..." CLI option
variable "hcloud_token" {
  sensitive = true # Requires terraform >= 0.14
}

variable "fingerprint" {
  default = "b0:79:32:50:66:1b:91:40:e6:99:be:4b:48:9d:c0:3d"
}

variable "server_tier" {
  default = "cx11"
}

variable "ssh_private_key" {
}

variable "game_server_repository" {
  default = "https://github.com/Zenidd/DockerMinecraft.git"
}

variable "server_name" {
  default = "minecraft"
}

