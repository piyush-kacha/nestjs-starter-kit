# NestJS Starter Kit

This is a starter kit for building a Nest.js application with MongoDB, Express, Clustering, Swagger, Pino, and Exception handling.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```shell
git clone https://github.com/piyush-kacha/nestjs-starter-kit.git YOUR_PROJECT_NAME # Replace YOUR_PROJECT_NAME with the name of your project
cd YOUR_PROJECT_NAME
npm ci
```

Use the copy command to create a copy of the example .env file. Replace `example.env` with the name of your example (`.env` or `.env.local` or `.env.development` or `.env.test`) file:

```shell
cp example.env .env # OR .env.local - .env.development - .env.test
```

## Generating an RSA Key Pair for JWT Authentication with OpenSSL

1. Generate a private key:

  ```shell
  openssl genrsa -out .keys/private_key.pem 2048
  ```

1. Extract the public key from the private key:

  ```shell
  openssl rsa -in .keys/private_key.pem -outform PEM -pubout -out .keys/public_key.pem
  ```

  This will create two files in the `.keys` directory **(THIS DIRECTORY IS IGNORED)**: `.keys/private_key.pem` (the private key) and `.keys/public_key.pem` (the corresponding public key). **DON'T SHARE THE PRIVATE KEY WITH ANYONE.**

  **_NOTE:_** The key size (2048 bits in this example) can be adjusted to suit your security requirements.

1. Encode the public key in base64 encoding:

  ```shell
  openssl base64 -A -in .keys/public_key.pem -out .keys/public_key_base64.txt
  ```

  Copy the contents of the `.keys/public_key_base64.txt` file and paste it into the `JWT_PUBLIC_KEY` variable declared in your `.env` file.

1. Encode the private key in base64 encoding:

  ```sh
  openssl base64 -A -in .keys/private_key.pem -out .keys/private_key_base64.txt
  ```

  Copy the contents of the `.keys/private_key_base64.txt` file and paste it into the `JWT_PRIVATE_KEY` variable declared in your `.env` file.

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run start:dev
```

This will start the application in watch mode, so any changes you make to the code will automatically restart the server.

To run the application in production mode, use the following command:

```bash
npm run start:prod
```

## Features

1. **Modularity**: The project structure follows a modular approach, organizing files into directories based on their functionalities. This makes it easier to locate and maintain code related to specific features or components of the application.

2. **Scalability**: The modular structure allows for easy scalability as the application grows. New modules, controllers, services, and other components can be added without cluttering the main directory.

3. **Separation of Concerns**: Each file has a clear purpose and responsibility, making it easier to understand and maintain the codebase. For example, configuration files are located in the `config/` directory, exception classes in the `exceptions/` directory, and shared modules in the `shared/` directory.

4. **Global Exception Handling**: The starter kit includes global exception filters (`AllExceptionsFilter`, `BadRequestExceptionFilter`, etc.) that catch and handle exceptions across the application. This promotes consistent error handling and improves the overall robustness of the application.

5. **Configuration Management**: The use of `@nestjs/config` allows for centralized management of environment variables and application configuration. This simplifies the process of accessing and modifying configuration values.

6. **Clustering**: The code includes clustering support, which enables the application to utilize multiple CPU cores for improved performance and scalability.

7. **Logging**: The integration of `nestjs-pino` enables efficient and customizable logging for the application. Pino is a fast and low-overhead logger that can be easily configured according to specific logging requirements.

8. **Swagger Documentation**: The starter kit includes Swagger integration (`@nestjs/swagger`) for generating interactive API documentation. Swagger provides a user-friendly interface for exploring and testing the API endpoints.

9. **Linting and Formatting**: The project includes configuration files for ESLint and Prettier, enforcing consistent code style and catching potential errors. This promotes code quality and maintainability across the development team.

10. **Docker Support**: The presence of a Dockerfile allows for containerization of the application, making it easier to deploy and run the application in different environments.

By leveraging this code structure, you can benefit from the well-organized and maintainable foundation provided by the NestJS starter kit. It provides a solid structure for building scalable and robust applications while incorporating best practices and popular libraries.

## Project Structure

```bash
nestjs-starter-kit/
├─ .commitlintrc.js
├─ .dockerignore
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .husky/
│  ├─ _/
│  │  ├─ .gitignore
│  │  └─ husky.sh
│  ├─ commit-msg
│  └─ pre-commit
├─ .keys/
│  └─ .gitkeep
├─ .lintstagedrc.js
├─ .npmignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ .release-it.json
├─ .vscode/
│  ├─ extensions.json
│  └─ settings.json
├─ Dockerfile
├─ LICENSE
├─ README.md
├─ example.env
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ renovate.json
├─ src/
│  ├─ app.module.ts
│  ├─ config/
│  │  ├─ api.config.ts
│  │  ├─ app.config.ts
│  │  ├─ auth.config.ts
│  │  ├─ database.config.ts
│  │  ├─ infra.config.ts
│  │  └─ swagger.config.ts
│  ├─ core/
│  │  ├─ application/
│  │  │  ├─ application.controller.ts
│  │  │  ├─ application.module.ts
│  │  │  └─ application.service.ts
│  │  ├─ core.module.ts
│  │  ├─ database/
│  │  │  ├─ abstracts/
│  │  │  │  ├─ database.abstract.interface.ts
│  │  │  │  ├─ database.abstract.repository.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ database-schema-options.ts
│  │  │  ├─ database.module.ts
│  │  │  └─ database.service.ts
│  │  ├─ exceptions/
│  │  │  ├─ all.exception.ts
│  │  │  ├─ bad-request.exception.ts
│  │  │  ├─ constants/
│  │  │  │  ├─ exceptions.constants.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ forbidden.exception.ts
│  │  │  ├─ gateway-timeout.exception.ts
│  │  │  ├─ index.ts
│  │  │  ├─ interfaces/
│  │  │  │  ├─ exceptions.interface.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ internal-server-error.exception.ts
│  │  │  └─ unauthorized.exception.ts
│  │  ├─ filters/
│  │  │  ├─ all-exception.filter.ts
│  │  │  ├─ bad-request-exception.filter.ts
│  │  │  ├─ forbidden-exception.filter.ts
│  │  │  ├─ gateway-timeout.exception.filter.ts
│  │  │  ├─ index.ts
│  │  │  ├─ internal-server-error-exception.filter.ts
│  │  │  ├─ not-found-exception.filter.ts
│  │  │  ├─ unauthorized-exception.filter.ts
│  │  │  └─ validator-exception.filter.ts
│  │  ├─ interceptors/
│  │  │  ├─ index.ts
│  │  │  ├─ serializer.interceptor.ts
│  │  │  └─ timeout.interceptor.ts
│  │  ├─ log/
│  │  │  └─ log.module.ts
│  │  └─ middlewares/
│  │     ├─ index.ts
│  │     └─ logging.middleware.ts
│  ├─ main.ts
│  ├─ metadata.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ decorators/
│  │  │  │  ├─ get-user.decorator.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ public.decorator.ts
│  │  │  ├─ dtos/
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ login.req.dto.ts
│  │  │  │  ├─ login.res.dto.ts
│  │  │  │  ├─ signup.req.dto.ts
│  │  │  │  └─ signup.res.dto.ts
│  │  │  ├─ guards/
│  │  │  │  ├─ index.ts
│  │  │  │  └─ jwt-user-auth.guard.ts
│  │  │  ├─ interfaces/
│  │  │  │  ├─ index.ts
│  │  │  │  └─ jwt-user-payload.interface.ts
│  │  │  └─ strategies/
│  │  │     ├─ index.ts
│  │  │     └─ jwt-user.strategy.ts
│  │  ├─ modules.module.ts
│  │  ├─ user/
│  │  │  ├─ dtos/
│  │  │  │  ├─ get-profile.res.dto.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  ├─ user.query.service.ts
│  │  │  ├─ user.repository.ts
│  │  │  └─ user.schema.ts
│  │  └─ workspace/
│  │     ├─ workspace.module.ts
│  │     ├─ workspace.query-service.ts
│  │     ├─ workspace.repository.ts
│  │     └─ workspace.schema.ts
│  ├─ shared/
│  │  ├─ decorators/
│  │  │  ├─ api-error-responses.decorator.ts
│  │  │  └─ index.ts
│  │  ├─ enums/
│  │  │  ├─ db.enum.ts
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  └─ types/
│  │     ├─ index.ts
│  │     ├─ or-never.type.ts
│  │     └─ schema.type.ts
│  └─ utils/
│     ├─ date-time.util.ts
│     ├─ deep-resolver.util.ts
│     ├─ document-entity-helper.util.ts
│     ├─ index.ts
│     ├─ number.util.ts
│     ├─ validate-config.util.ts
│     └─ validation-options.util.ts
├─ test/
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json
```

This project follows a structured organization to maintain clean, scalable code, promoting best practices for enterprise-level applications.

### 1. Root Files and Configuration

- **`Dockerfile`**: Defines how to build the Docker image for the application, including separate stages for development and production.
- **`README.md`**: Provides an overview and documentation for the project.
- **`.husky/`**: Contains Git hooks for automated checks during commit and push operations.
- **`example.env`**: A sample environment file illustrating the required environment variables.

### 2. Source Code (`src/`)

- **`app.module.ts`**: The main module that aggregates all the feature modules and services.
- **`main.ts`**: The entry point of the NestJS application; bootstraps the application and configures clustering.

#### Subdirectories within `src/`

- **`config/`**: Stores configuration files (e.g., `database.config.ts`, `auth.config.ts`) for different aspects of the application.
- **`core/`**: Core functionalities and shared resources:
  - **`application/`**: Main application logic and services.
  - **`database/`**: Database-related configurations and services.
  - **`exceptions/`**: Custom exception classes.
  - **`filters/`**: Custom exception filters.
  - **`interceptors/`**: Interceptors for request/response handling.
  - **`log/`**: Logging module.
  - **`middlewares/`**: Custom middlewares.
- **`modules/`**: Contains feature modules of the application:
  - **`auth/`**: Handles authentication-related functionality.
  - **`user/`**: Manages user-related operations.
  - **`workspace/`**: Manages workspace-related functionality.
- **`shared/`**: Contains shared resources and utilities:
  - **`decorators/`**: Custom decorators.
  - **`enums/`**: Enumerations used across the application.
  - **`types/`**: Custom TypeScript types.
- **`utils/`**: Utility functions for common operations.

### 3. Testing (`test/`)

- **`test/`**: Houses end-to-end test specifications (`app.e2e-spec.ts`) and configuration files (`jest-e2e.json`) for testing.

### 4. Configuration and Tooling

- **`.commitlintrc.js`**: Configures commit message linting rules to enforce a consistent commit history using the Conventional Commits specification.
- **`.dockerignore`**: Specifies files and directories to be excluded from the Docker image build context.
- **`.editorconfig`**: Defines coding style settings (e.g., indentation, line endings) to ensure consistency across different editors.
- **`.eslintignore`**: Specifies files and directories to be ignored by ESLint.
- **`.eslintrc.js`**: Configures ESLint rules and settings for code quality and style enforcement.
- **`.gitignore`**: Lists files and directories to be excluded from version control.
- **`.lintstagedrc.js`**: Configures lint-staged for running linters on staged Git files.
- **`.npmignore`**: Specifies files and directories to be excluded when publishing the package to npm.
- **`.npmrc`**: Configures npm-specific settings (e.g., registry URL).
- **`.prettierignore`**: Lists files and directories to be excluded from Prettier formatting.
- **`.prettierrc`**: Configures Prettier settings for code formatting.
- **`nest-cli.json`**: Configuration file for the NestJS CLI, defining paths and settings.
- **`package.json`**: Lists project metadata, scripts, and dependencies.
- **`package-lock.json`**: Lockfile for npm dependencies to ensure consistent installs across environments.
- **`tsconfig.build.json`**: TypeScript configuration for building the project.
- **`tsconfig.json`**: Main TypeScript configuration file.

### Key Features of the Project Structure

- **Modular Design**: The application is organized into modules (`modules/` directory), each encapsulating a specific feature set, making the codebase scalable and maintainable.
- **Centralized Configuration**: All configuration files are stored under `config/`, promoting centralized management of application settings.
- **Custom Error Handling**: Custom exceptions and filters (`exceptions/` and `filters/` directories) provide granular control over error handling.
- **Testing and Linting**: The project is set up with robust testing (`test/` directory) and linting tools (`.eslintrc.js`, `.eslintignore`), ensuring high code quality and reliability.
- **Dockerization**: The `Dockerfile` supports both development and production environments, enabling seamless deployment.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you would like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
