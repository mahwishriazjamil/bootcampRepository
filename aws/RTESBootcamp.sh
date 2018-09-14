echo "hello there" >> ~/greetings

# sudo apt-get update
# above will not allow apache2 install (?)

sudo apt install apache2 -y

sudo rm -rf /var/www/html
sudo mv html /var/www
sudo mv css /var/www
