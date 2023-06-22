# NestJS Starter Kit

This is a starter kit for building a Nest.js application with MongoDB, Express, Clustering, Swagger, Pino, and Exception handling.


## Getting Started
To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/piyush-kacha/nestjs-starter-kit.git
cd nestjs-starter-kit
npm ci
```

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

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you would like to contribute code, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Features:
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


# Project Structure

```bash
nestjs-starter-kit/
├── .husky/
│   ├── commit-msg
│   └── pre-commit
├── src/
│   ├── config/
│   ├── exceptions/
│   ├── filters/
│   ├── shared/
│   ├── app.config.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .commitlintrc.js
├── .dockerignore
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .lintstagedrc.js
├── .npmignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── Dockerfile
├── example.env
├── LICENSE
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```
- `.husky/` directory contains Git hooks for the project.
- `src/` directory contains the source code for the project.
  - `config/` directory contains configuration files for the project.
  - `exceptions/` directory contains exception classes for the project.
  - `filters/` directory contains filter classes for the project.
  - `shared/` directory contains shared modules for the project.
  - `app.config.ts` file contains the configuration for the NestJS application.
  - `app.controller.ts` file contains the main controller for the NestJS application.
  - `app.module.ts` file contains the main module for the NestJS application.
  - `app.service.ts` file contains the main service for the NestJS application.
  - `main.ts` file is the entry point for the NestJS application.
- `.commitlintrc.js` file contains the configuration for commit linting.
- `.dockerignore` file contains patterns to exclude from Docker builds.
- `.editorconfig` file contains configuration for editor settings.
- `.eslintignore` file contains patterns to exclude from ESLint checks.
- `.eslintrc.js` file contains the configuration for ESLint.
- `.gitignore` file contains patterns to exclude from Git commits.
- `.lintstagedrc.js` file contains the configuration for lint-staged.
- `.npmignore` file contains patterns to exclude from npm packages.
- `.npmrc` file contains configuration for npm.
- `.prettierignore` file contains patterns to exclude from Prettier formatting.
- `.prettierrc` file contains the configuration for Prettier.
- `Dockerfile` file contains the Dockerfile for the project.
- `example.env` file contains an example environment file.
- `LICENSE` file contains the license for the project.
- `nest-cli.json` file contains the configuration for the NestJS CLI.
- `package-lock.json` file contains the lockfile for npm packages.
- `package.json` file contains the metadata and dependencies for the project.
- `tsconfig.build.json` file contains the TypeScript configuration for building the project.
- `tsconfig.json` file contains the TypeScript configuration for the project.
# src/main.ts
 The given code is a TypeScript file that creates a NestJS application instance and starts it. It also checks if clustering is enabled and forks workers for each available CPU if it is. The code imports external modules such as `cluster`, `os`, `@nestjs/config`, `@nestjs/swagger`, `@nestjs/common`, and `nestjs-pino`. It also imports an internal module `AppModule`. 

The `bootstrap()` function creates the NestJS application instance, uses the Pino logger for the application, allows all origins, defines Swagger options and document, sets up the Swagger UI endpoint, gets the configuration service from the application, gets the port number from the configuration, starts the application, and logs a message to indicate that the application is running.

If clustering is enabled, the code gets the number of CPUs on the machine, forks workers for each available CPU if the current process is the master process, and logs when a worker process exits. If clustering is not enabled, the code calls the `bootstrap()` function to start the application.


# src/app.module.ts

This file is the main module of the NestJS application. It imports required modules, application files, filters, and other modules. It also defines the application's controller and service.

## Imports

The following modules are imported:

- `APP_FILTER` and `APP_PIPE` from `@nestjs/core`: These are used to define global filters and pipes for the application.
- `ConfigModule` and `ConfigService` from `@nestjs/config`: These are used to configure environment variables.
- `LoggerModule` from `nestjs-pino`: This is used to configure logging.
- `Module`, `ValidationError`, and `ValidationPipe` from `@nestjs/common`: These are used to define the application's module, validation errors, and validation pipes.
- `MongooseModule` from `@nestjs/mongoose`: This is used to configure Mongoose.

## Application Files

The following application files are imported:

- `AppConfig` from `./app.config`: This is used to get the logger configuration.
- `AppController` from `./app.controller`: This is the application's controller.
- `AppService` from `./app.service`: This is the application's service.
- `configuration` from `./config/index`: This is used to load the environment variables from the configuration file.

## Filters

The following filters are imported:

- `AllExceptionsFilter` from `./filters`: This is a global filter that catches all exceptions.
- `BadRequestExceptionFilter` from `./filters`: This is a global filter that catches bad request exceptions.
- `ForbiddenExceptionFilter` from `./filters`: This is a global filter that catches forbidden exceptions.
- `NotFoundExceptionFilter` from `./filters`: This is a global filter that catches not found exceptions.
- `UnauthorizedExceptionFilter` from `./filters`: This is a global filter that catches unauthorized exceptions.
- `ValidationExceptionFilter` from `./filters`: This is a global filter that catches validation exceptions.

## Other Modules

Other modules can be imported here.

## Configuration

The following configurations are defined:

- Environment variables are configured using `ConfigModule.forRoot`.
- Logging is configured using `LoggerModule.forRootAsync`.
- Mongoose is configured using `MongooseModule.forRootAsync`.

## Providers

The following providers are defined:

- `AppService`: This is the application's service.
- Global filters are defined using `APP_FILTER` and `useClass`.
- A global validation pipe is defined using `APP_PIPE` and `useFactory`.

## Controller

The following controller is defined:

- `AppController`: This is the application's controller.

## Service

The following service is defined:

- `AppService`: This is the application's service.


# .eslintrc.js
The given code is a JavaScript file that exports an object containing configuration options for the ESLint linter. ESLint is a popular tool for enforcing code style and catching errors in JavaScript code. 

The configuration options include settings for the TypeScript parser, plugins for ESLint, rules for code style, and settings for the environment in which the code is run. 

Some notable rules include disabling certain TypeScript-specific rules, enabling the removal of unused imports, and sorting imports automatically. 

The configuration object is exported so that it can be used by ESLint to enforce the specified rules and settings. 

# Dockerfile

This is a Dockerfile, which is a script that contains instructions for building a Docker image. A Docker image is a lightweight, standalone, and executable package that includes everything needed to run a piece of software, including the code, runtime, libraries, and system tools. 

This Dockerfile has three main sections, each starting with a `FROM` instruction that specifies the base image to use for that section. 

The first section is for building the image for local development. It starts with a base image of `node:18-alpine` and sets the user to `node`. It then creates a working directory, copies the `package.json` and `package-lock.json` files, installs the app dependencies using `npm ci`, and copies the app source code. 

The second section is for building the image for production. It starts with the same base image and user, creates the working directory, copies the `package.json` and other files, and copies the `node_modules` directory from the development image. It then runs `npm run build` to build the app, sets the `NODE_ENV` environment variable to `production`, and installs only the production dependencies using `npm ci`. 

The third section is for the production image. It starts with the same base image and copies the `node_modules` and `dist` directories from the build image. It then starts the server using the `node dist/main.js` command. 


# .prettierrc
`.prettierrc` is a configuration file for the Prettier code formatter. It specifies the formatting rules for the code in the project.

- `"semi": true` specifies that semicolons should be used at the end of statements.
- `"trailingComma": "all"` specifies that trailing commas should be used wherever possible.
- `"singleQuote": true` specifies that single quotes should be used for string literals.
- `"printWidth": 140` specifies the maximum line length for the code. If a line exceeds this length, it will be wrapped.
- `"tabWidth": 2` specifies the number of spaces to use for indentation.
- `"endOfLine": "lf"` specifies the line ending style to use. In this case, it is set to "lf" which stands for "line feed".

# .gitignore
`.gitignore` is a file that specifies which files and directories should be ignored by Git. Git is a popular version control system that is used to track changes in files and directories.

The `.gitignore` file in this project specifies that the `node_modules` directory should be ignored. This directory contains the dependencies for the project, which are installed using the `npm install` command.

# .env
`.env` is a file that contains environment variables. Environment variables are variables that are used to configure the application. They are used to store sensitive information such as passwords and API keys.

# .env.example
`.env.example` is a file that contains example environment variables. It is used to show the format of the environment variables that should be defined in the `.env` file.


# .dockerignore
`.dockerignore` is a file that specifies which files and directories should be ignored by Docker. Docker is a popular tool for building and running containers. Containers are lightweight, standalone, and executable packages that include everything needed to run a piece of software, including the code, runtime, libraries, and system tools.

The `.dockerignore` file in this project specifies that the `node_modules` directory should be ignored. This directory contains the dependencies for the project, which are installed using the `npm install` command.

# .editorconfig
`.editorconfig` is a file that specifies the formatting rules for the code in the project. It is used by editors and IDEs to ensure that the code is formatted consistently across different editors and IDEs.

- `root = true` specifies that this is the root `.editorconfig` file.
- `[*]` specifies that the rules apply to all files.
  - `charset = utf-8` specifies that the character encoding should be UTF-8.
  - `indent_style = space` specifies that spaces should be used for indentation.
  - `indent_size = 2` specifies the number of spaces to use for indentation.
  - `end_of_line = lf` specifies the line ending style to use. In this case, it is set to "lf" which stands for "line feed".
  - `insert_final_newline = true` specifies that a newline should be inserted at the end of the file.
  -  `trim_trailing_whitespace = true` specifies that trailing whitespace should be trimmed.
-  `[package.json]` specifies that the rules apply only to `package.json` files.
-  `[*.yml]` specifies that the rules apply only to `.yml` files.
-  `[*.ts]` specifies that the rules apply only to `.ts` files.
- [More information about EditorConfig](https://editorconfig.org/)


# .eslintignore
`.eslintignore` is a file that specifies which files and directories should be ignored by ESLint. ESLint is a popular tool for enforcing code style and catching errors in JavaScript code.

The `.eslintignore` file in this project specifies that the `node_modules` directory should be ignored. This directory contains the dependencies for the project, which are installed using the `npm install` command.


# .commitlintrc.js
`.commitlintrc.js` is a configuration file for commit linting. It specifies the rules for commit messages in the project.

- `// https://www.conventionalcommits.org/en/v1.0.0` is a comment that provides a link to the Conventional Commits specification, which is a standard for commit messages.
- `module.exports = { extends: ['@commitlint/config-conventional'] };` exports an object that specifies the configuration for commit linting. In this case, it extends the `config-conventional` preset from the `@commitlint` package, which enforces the Conventional Commits specification.

The Conventional Commits specification defines a standard format for commit messages that makes it easier to understand the changes made in a commit. The format consists of a header, an optional body, and an optional footer. The header contains a type, a scope, and a subject. The type describes the kind of change made (e.g. `feat` for a new feature, `fix` for a bug fix, `docs` for documentation changes, etc.). The scope describes the part of the codebase that was affected by the change. The subject is a brief summary of the change.

By enforcing the Conventional Commits specification, commit linting helps ensure that commit messages are consistent and informative, making it easier to understand the history of the project.
