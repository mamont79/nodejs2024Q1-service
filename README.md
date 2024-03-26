# Home Library Service SPRINT3

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/mamont79/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Instructions for Part2

## Steps to get checked:

- Clone repo and checkout to the **sprint2** branch
- Install dependencies:

```
npm i
```

- Create **.env file** (based on .env.example)
- Build app and db images, run containers in daemon mode and run migrations:

```
npm run docker:up
```

- For run linter:

```
npm run lint
```

- For tests:

```
npm run test
```

for local or

```
npm run docker:test
```

in container

## Other commands

- For vulnerabilities scanning: **npm run docker:scan**
- For stop and remove containers - **npm run docker:down**
- For full cleanup: **npm run docker:clean**
- For build images without running - **npm run docker:build**

## A few important notes

- The application container runs in hot-reload mode - you can change the source code in the local ./src folder and the application in the container will restart automatically.
- All migrations are done locally
- If you want to change application or database port settings first stop and remove containers - **npm run docker:down**, make changes in **.env** file and then start again **npm run docker:up**

- If during startup or testing you see error messages such as

```
Error: Connection terminated unexpectedly
Exceeded timeout of 5000 ms for a test
dependency failed to start: container db is unhealthy
```

or something similar, it is most likely that your hardware is not coping with the load. Try full cleanup and restarting everything by stopping all non-test related applications

- You can see the images in the public repo at https://hub.docker.com/u/mamont79
