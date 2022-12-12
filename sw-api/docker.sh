#!/bin/bash

APP="sw-api"

# lê versão a partir do arquivo package.json
VERSION=$(sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json)

PORT_HOST=80
PORT_CONTAINER=3000

COLOR_RED="31"
COLOR_GREEN="32"
COLOR_CYAN="36"

print_error() {
  echo -e "\e[${COLOR_RED}mErro:\e[0m $1"
}


print_help() {
  echo -e "\e[${COLOR_GREEN}mInstruções para execução do script\e[0m"
  echo -e "Opções disponíveis:"
  echo -e "  -h  Ajuda"
#  echo -e "  -V  verbose"
  echo -e "  -v  Mostra versão"
  echo -e "  -i  Faz build de imagem"
  echo -e "  -b  Faz build do app via NPM localmente"
  echo -e "  -B  Faz build do app via NPM através do docker"
  echo -e "  -I  Lista images docker com nome do app"
  echo -e "  -c  Lista containers em execução com nome do app"
  echo -e "  -X  Roda container da aplicação que tenha sido previamente uma imagem criada."
  echo -e "  -p  Push image"
  echo -e ""
  echo -e "Exemplos de uso: "
  echo -e "  - ./app -i; cria uma imagem Docker "
  echo -e "  - ./app -X; executa container. Para parar: Ctrl+C."
  echo -e "  - ./app -ip; ria imagem, faz push."
  echo -e "  - ./app -V<outras letras>; mostra comandos ao executar."
  exit
}

find_env() {
  echo -e "\n\e[${COLOR_GREEN}m.:: Finding env ::.\e[0m\n"
  if [ "" == "$DOCKER_IO_URL" ]; then
    print_error "Necessário definir variável de ambiente DOCKER_IO_URL."
    exit 1
  fi

  #echo -e "\e[${COLOR_CYAN}mCONFIG detectado: DOCKER_IO_URL=${DOCKER_IO_URL}\e[0m"
  #echo -e "\e[${COLOR_CYAN}mCONFIG detectado: VERSION=${VERSION}\e[0m"
}

check_version(){
  if [ "" == "$VERSION" ]; then
    print_error "Necessário informar a versão (opção -v)"
    exit 1
  fi
}

#build_app() {
#  echo -e "\n\e[${COLOR_GREEN}m.:: Building $APP:$VERSION (NPM) ::.\e[0m\n"
#  npm run build
#}

build_image() {
  check_version
  dockerfilename=$1
  echo -e "\n\e[${COLOR_GREEN}m.:: Building $APP:$VERSION Docker image ::.\e[0m\n"
  docker build --force-rm \
         -t ${DOCKER_IO_URL}/$APP:$VERSION \
         -t ${DOCKER_IO_URL}/$APP:latest \
         -f $dockerfilename \
         .
  
}

build_image_local() {
  #npm run pipeline:prod
  build_image Dockerfile
}

list_images(){
  echo -e "\n\e[${COLOR_GREEN}m.:: Listing images ::.\e[0m\n"
  docker image ls | grep $APP
}

list_containers(){
  echo -e "\n\e[${COLOR_GREEN}m.:: Listing containers ::.\e[0m\n"
  docker container ls | grep $APP
}

start_container() {
  echo -e "\n\e[${COLOR_GREEN}m.:: Starting $APP:$VERSION in container ::.\e[0m\n"
  check_version
  docker run -p $PORT_HOST:$PORT_CONTAINER ${DOCKER_IO_URL}/$APP:$VERSION
  wait
}

start_local() {
  echo -e "\n\e[${COLOR_GREEN}m.:: Starting $APP:$VERSION locally ::.\e[0m\n"
  check_version
  npm start --open
}

push_image() {
  echo -e "\n\e[${COLOR_GREEN}m.:: Pushing $APP:$VERSION ::.\e[0m\n"
  docker push $DOCKER_IO_URL/$APP:$VERSION
}

find_env

while getopts "VvpIXxiCh" OPTION
do
  case $OPTION in
    I) list_images ;;
    C) list_containers ;;
    x) start_local ;;
    X) start_container ;;
#    b) build_app ;;
#    B) build_image_docker ;;
    i) build_image_local ;;
#    V) VERSION=$OPTARG ;;
    V) set -x ;;
    v) echo -e "Versão a usar: ${VERSION}" ;;
    p) push_image ;;
    h | *) print_help ;;
  esac
done
shift $((OPTIND-1))
