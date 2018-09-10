###################################################################################################

resource "aws_key_pair" "key" {
  public_key = "${file("access/${var.key}.pub")}"
  key_name   = "${var.key}"
}

###################################################################################################

module "vpc" {
  source = "github.com/terraform-aws-modules/terraform-aws-vpc?ref=v1.32.0"
  name   = "${var.username}"
  cidr   = "10.10.0.0/16"

  azs             = ["${var.azs}"]
  public_subnets  = ["10.10.128.0/24"]

  create_database_subnet_group = false
  enable_dns_hostnames         = true
}

###################################################################################################

module "application" {

  source      = "github.com/terraform-aws-modules/terraform-aws-security-group?ref=v1.25.0"
  name        = "${var.username}-RTESBootcamp"
  description = "SSH and HTTP(S)"

  vpc_id = "${module.vpc.vpc_id}"
  ingress_with_cidr_blocks = [
    {  rule = "https-443-tcp"     cidr_blocks = "0.0.0.0/16" },
    {  rule = "http-80-tcp"       cidr_blocks = "0.0.0.0/16" },
    {  rule = "ssh-tcp"           cidr_blocks = "212.183.131.197/32" }   
    ]

  egress_with_cidr_blocks = [
    {  rule = "https-443-tcp"    cidr_blocks = "0.0.0.0/0"     },
    {  rule = "http-80-tcp"      cidr_blocks = "0.0.0.0/0"     },
    {  rule = "ssh-tcp"          cidr_blocks = "10.10.0.0/16"  }
    ]
}

###################################################################################################

resource "aws_instance" "application" {

  ami                         = "ami-2a7d75c0"
  key_name                    = "${var.key}"
  instance_type               = "t2.micro"
  private_ip                  = "10.10.128.10"
  subnet_id                   =  "${element(module.vpc.public_subnets, 0)}"
  vpc_security_group_ids      = ["${module.application.this_security_group_id}"]

  tags { Name = "${var.username}-RTESBootcamp" }

 provisioner "file" {
    connection {
      user         = "ubuntu"
      host         = "${aws_instance.application.public_ip}"
      private_key  = "${file("access/${var.key}")}"
    }
    source      = "../HTML"
    destination = "/home/ubuntu"
  }

  provisioner "remote-exec" {
    connection {
      user         = "ubuntu"
      host         = "${aws_instance.application.public_ip}"
	    private_key  = "${file("access/${var.key}")}"
   
    }
    script = "RTESBootcamp.sh"
  }
}
resource "aws_eip_association" "application" {
  instance_id   = "${aws_instance.application.id}"
  allocation_id = "${var.eip}"
}

###################################################################################################
