echo "hello there" >> ~/greetings

sudo apt update
sudo apt install apache2 -y

sudo rm -rf /var/www/html
sudo mv html /var/www
sudo mv css /var/www
