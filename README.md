# City of Gold Technical Exam

This repository contains the solution for the City of Gold technical Assesment.

## How to Run

This project uses Docker Compose to manage the application and its dependencies. Follow these steps to run the development application:

1.  **Install Docker and Docker Compose:**
    Ensure you have Docker and Docker Compose installed on your system. You can download them from the official Docker website.

2.  **Navigate to the Project Directory:**
    Open your terminal and navigate to the root directory of this project.

3.  **Build and Run the Application:**
    Execute the following command to build and start the application:

    ```bash
    docker-compose up --build
    ```

    This command will:

    - Build the Docker images for the application.
    - Start the application and its dependencies (if any) in containers.

4.  **Access the Application:**
    Once the containers are running, you can access the application through your web browser or API client. The specific URL and port will depend on the application's configuration (usually `http://localhost:3000`).

5.  **Stop the Application**
    To stop the application, execute the following command in the same terminal:
    ```bash
    docker-compose down
    ```

## Project Stack

1. frontend - react, axios, tailwindcss
2. backend - nodejs, express, bcryptjs, mysql
3. database of choice - mysql.
