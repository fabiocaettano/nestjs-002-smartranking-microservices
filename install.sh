#!/bin/bash

echo Instalação do NVM
declare -a NVM_1=(apt update)
declare -a NVM_2=(apt install curl -y)
declare -a NVM_3=(curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh '|' bash)
declare -a NVM_4=(source ~/.profile)
declare -a INSTALACAO_NVM=(${NVM_1[@]} '&&' ${NVM_2[@]}  '&&' ${NVM_3[@]}  '&&' ${NVM_4[@]})
if ! eval ${INSTALACAO_NVM[@]}
then
    echo Falha na instalação do NVM    
    exit 1
fi

echo Instalação Node
declare -a NODE_1=(nvm install v14.21.1)
declare -a NODE_2=(nvm use v14.21.1)
declare -a INSTALACAO_NODE=(${NODE_1[@]} '&&' ${NODE_2[@]})
if ! eval ${INSTALACAO_NODE[@]}
then
    echo Falha na instalação do Node
    exit 1
fi

echo Instalação do Docker
declare -a DOCKER_1=(apt-get update)
declare -a DOCKER_2=(sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common -y)
declare -a DOCKER_3=(curl -fsSL https://download.docker.com/linux/debian/gpg '|' sudo apt-key add -)
declare -a DOCKER_4=(add-apt-repository '"'deb [arch=amd64] https://download.docker.com/linux/debian buster stable'"')
declare -a INSTALACAO_DOCKER_1=(${DOCKER_1[@]} '&&' ${DOCKER_2[@]} '&&' ${DOCKER_3[@]} '&&' ${DOCKER_4[@]})
if ! eval ${INSTALACAO_DOCKER_1[@]}
then 
    echo Falha na instalação do Docker 1/2
    exit 1    
fi 

declare -a DOCKER_5=(apt-get update)
declare -a DOCKER_6=(sudo apt-get install docker-ce docker-ce-cli containerd.io -y)
declare -a INSTALACAO_DOCKER_2=(${DOCKER_5[@]} '&&' ${DOCKER_6[@]})
if ! eval ${INSTALACAO_DOCKER_2[@]}
then 
    echo Falha na instalação do Docker 2/3
    exit 1
fi

echo Instalação Docker-Compose
declare -a DOCKER_7=(sudo curl -L '"'https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)'"' -o /usr/local/bin/docker-compose)
declare -a DOCKER_8=(sudo chmod +x /usr/local/bin/docker-compose)
declare -a INSTALACAO_DOCKER_3=(${DOCKER_7[@]} '&&' ${DOCKER_8[@]})
if ! eval ${INSTALACAO_DOCKER_3[@]}
then 
    echo Falha na instalação do Docker Compose 3/3
    exit 1
fi
