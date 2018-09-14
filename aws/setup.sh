
source ./terraform.tfvars
while true; do
	read -p "generate new AWS access keys? (y/n) : " yn
	case $yn in
		[Yy]* ) read -p "please enter your multifactor authentication code : " token
			aws sts get-session-token --serial-number arn:aws:iam::$aws_id:mfa/$email --token-code $token > authentication.tf
			head -n -3 authentication.tf > temporary; mv temporary authentication.tf

			sed -i 's/{//g' authentication.tf
			sed -i 's/}//g' authentication.tf
			sed -i 's/        //g' authentication.tf
			sed -i 's/"AccessKeyId": /variable "AccessKeyId" { default = /g' authentication.tf
			sed -i 's/"SecretAccessKey": /variable "SecretAccessKey" { default = /g' authentication.tf
			sed -i 's/"SessionToken": /variable "SessionToken" { default = /g' authentication.tf
			sed -i 's/"Credentials"://g' authentication.tf
			sed -i 's/,/ }/g' authentication.tf
			sed -i 's/   //g' authentication.tf
			sed -i 's/  //g' authentication.tf

		if [ -s authentication.tf ]; then echo "successful!"; break; else echo "no access key output detected"; fi;;

		[Nn]* ) break ;;
        * ) echo    "please enter a valid response";;
	esac
done

while true; do
	read -p "generate new public-private keypairs? (y/n) : " yn
	case $yn in
		[Yy]* ) ssh-keygen -f access/$key -t rsa -N ''
					  break;;
		[Nn]* ) break;;
        * ) echo		"please enter a valid response";;
	esac
done
exit
