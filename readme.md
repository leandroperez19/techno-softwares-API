# Data Dashboard API - Full Stack Developer Task

This project is the backend for the Data Dashboard. It provides RESTful APIs for fetching and manipulating data stored in MySQL and MongoDB. It includes authentication, logging, and various endpoints to support the frontend.

## Setup and Execution

### 1. **Install and Run Locally**

#### **Prerequisites**

-   Install [MongoDB Compass](https://www.mongodb.com/try/download/compass) for managing MongoDB.
-   Install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) for managing MySQL.

#### **Steps**

1. **Extract the Project**  
   Extract the zip file to your desired directory.

2. **Navigate to the Project Directory**

    ```bash
    `cd techno-softwares-api`

    ```

3. **Install Dependencies**
   Create a .env file in the root of the project with the following keys:

    ```
    PORT=4000
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_DATABASE=data_dashboard
    MONGO_URI=mongodb://localhost:27017/data_dashboard
    JWT_SECRET=your_jwt_secret
    ```

4. **Setup Environment Variables**
   Install the required packages using npm:
   `npm install`

5. **Run the Development Server**
   `npm run dev`

6.**Access the API**
The API will run at: `http://localhost:4000`

### 2.**Docker Setup**

This project supports Docker to simplify setup for both development and production environments.

1. **Build and Run with Docker Compose**
   In the root directory, run:
   `docker-compose up`

2. **Access the API**
   The API will be available at:
   `http://localhost:4000`
   `

## Project Features

1. **Endpoints**

    - User Authentication: Secure login with JWT.
    - Sales Data: Retrieve, filter, and aggregate sales data from MySQL.
    - Logs: Retrieve user activity logs from MongoDB with pagination and filtering.

2. **Database Management**

    - MySQL: Used for structured data such as sales and categories.
    - MongoDB: Used for unstructured data such as user activity logs.

3. **Middleware**

    - CORS for cross-origin requests.
    - Express-async-handler for error handling.

4. **Validation**

    - Zod schemas for request and response validation.

5. **Security**

    - Password hashing with bcryptjs.
    - JWT-based authentication.

## Notes

    - Make sure to configure MongoDB Compass and MySQL Workbench for database setup if running locally.

    - If using Docker, all dependencies are pre-configured, and running docker-compose up will start both databases and the API.
