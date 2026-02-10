#!/bin/bash

# Script de despliegue AWS EC2 - Literatura API
# Este script debe ejecutarse en la instancia EC2

echo "🚀 Iniciando despliegue de Literatura API..."

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
sudo yum update -y

# 2. Instalar Git (si no está instalado)
echo "📥 Instalando Git..."
sudo yum install git -y

# 3. Instalar Docker (si no está instalado)
echo "🐋 Instalando Docker..."
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# 4. Instalar Docker Compose
echo "🔧 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. Crear directorio de aplicación
echo "📁 Creando directorio de aplicación..."
mkdir -p ~/app
cd ~/app

# 6. Clonar o actualizar repositorio
if [ -d "ProyectoNodeJs" ]; then
    echo "🔄 Actualizando repositorio existente..."
    cd ProyectoNodeJs
    git pull origin main
else
    echo "📥 Clonando repositorio..."
    git clone https://github.com/Guillegas/ProyectoNodeJs.git
    cd ProyectoNodeJs
fi

# 7. Detener contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# 8. Construir y levantar contenedores (sin bind mount)
echo "🏗️  Construyendo y levantando contenedores..."
docker-compose up -d --build

# 9. Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios inicien..."
sleep 30

# 10. Verificar estado de los contenedores
echo "✅ Verificando estado de los contenedores..."
docker-compose ps

echo ""
echo "✨ ¡Despliegue completado!"
echo "📍 API disponible en: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "📊 phpMyAdmin disponible en: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo ""
echo "🔍 Comandos útiles:"
echo "  - Ver logs: docker-compose logs -f"
echo "  - Reiniciar: docker-compose restart"
echo "  - Detener: docker-compose down"
