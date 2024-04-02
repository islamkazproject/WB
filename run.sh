#!/bin/bash

# Остановить все запущенные контейнеры
docker stop $(docker ps -a -q)

# Удалить контейнер whitebeauty-dev
docker rm whitebeauty-dev

# Удалить образ whitebeauty
docker rmi whitebeauty

# Удалить volume whitebeauty_backend_volume
docker volume rm whitebeauty_backend_volume

# Запустить docker-compose up -d
docker-compose up -d