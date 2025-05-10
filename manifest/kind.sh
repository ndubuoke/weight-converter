#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
APP_NAME="weight-converter"
IMAGE_NAME="ndubuoke/weight-converter:latest"
LOCAL_PORT=8080
CONTAINER_PORT=3000

echo "✅ Applying Deployment..."
kubectl apply -f deployment.yml

echo "✅ Applying Service..."
kubectl apply -f service.yml

echo "🕒 Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=$APP_NAME --timeout=60s

echo "🌐 Access Application on port : $CONTAINER_PORT"