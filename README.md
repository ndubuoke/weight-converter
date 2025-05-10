# ⚖️ Weight Converter App

This is a simple React + Express application that allows users to convert between weight units (kg to lbs). It includes:

- A React-based frontend
- A Node.js + Express backend
- Conversion history tracking in-browser
- Logging of conversions to Docker container stdout for use with monitoring stacks (e.g., Prometheus, Grafana)
- Dockerized deployment

## 🚀 Features

- Convert between kilograms (kg) and pounds (lbs)
- View conversion history in-browser
- Logs each conversion to the backend, which is viewable in container logs
- Ready for integration with ArgoCD, Prometheus, and Grafana for full observability

## 📦 Installation & Setup

### Prerequisites
- Docker
- (Optional) Node.js and npm if running locally without Docker

### Clone the Repository
```bash
git clone https://github.com/your-username/weight-converter.git
cd weight-converter
```

## 🐳 Running with Docker

### Build the Docker image
```bash
docker build -t weight-converter .
```

### Run the container
```bash
docker run -p 3000:3000 weight-converter
```

Visit: http://localhost:3000

## 🧪 Running Locally Without Docker
```bash
# Install backend dependencies
npm install

# Build React frontend
npm run build

# Start the server
node server.js
```

## 📜 Viewing Logs
Each weight conversion is POSTed to the `/log` endpoint and logged to stdout. You can view them via:

```bash
docker logs <container_id>
```

Example log output:

```json
{"timestamp":"2025-05-10T11:21:13.496Z","inputValue":333,"fromUnit":"kg","toUnit":"lbs","convertedValue":734.14}
```

These logs are suitable for scraping by logging agents (FluentBit, Loki) and for metrics pipelines (Prometheus, Grafana).

## 🛠️ Roadmap / TODO
- Add support for more units (grams, ounces, stones)
- Add persistent logging using a database (e.g., SQLite, PostgreSQL)
- Add Prometheus metrics endpoint
- Add Kubernetes manifests and ArgoCD integration
- Add API tests

## 🤝 Contributing
Feel free to open issues or pull requests to suggest improvements or add features!

## 📝 License
MIT License