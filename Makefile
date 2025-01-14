# Makefile for a simple Node.js Express app with Docker

# Variables
APP_NAME = fileverse-storage
DOCKER_IMAGE = $(APP_NAME):latest
DOCKER_CONTAINER = $(APP_NAME)-container
ENV_FILE = .env

# Default target
.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	npm install

# Build the Docker image
.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE) .

# Run the Docker container
.PHONY: run
run:
	docker run -d -p 8001:8001 --name $(DOCKER_CONTAINER) --env-file $(ENV_FILE) $(DOCKER_IMAGE)

# Stop the Docker container
.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER) || true
	docker rm $(DOCKER_CONTAINER) || true

# Clean up Docker images and containers
.PHONY: clean
clean: stop
	docker rmi $(DOCKER_IMAGE) || true

# Remove node_modules
.PHONY: clean-modules
clean-modules:
	rm -rf node_modules

# Rebuild the project
.PHONY: rebuild
rebuild: clean-modules install build

# Run tests
.PHONY: test
test:
	npm test