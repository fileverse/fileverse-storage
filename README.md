# Fileverse Storage

Service to handle upload of file from authorised UCANs.
## Getting Started

### Prerequisites

- Node.js
- npm
- Docker (optional)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/fileverse-storage.git
    cd fileverse-storage
    ```

2. Copy the sample environment file and configure the environment variables:
    ```sh
    cp .env.sample .env
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

#### Using npm

```sh
npm start
```

#### Using Docker

1. Build the Docker image:
    ```sh
    docker build -t fileverse-storage .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 8001:8001 fileverse-storage
    ```

### Deployment

The application is automatically deployed to EKS dev/prod clusters based on the target branch (development/main). Environment files for the deployed app can be found in the AWS SecretsManager service.

- Development branch: `development`
- Production branch: `main`

### License

This project is licensed under the MIT License.