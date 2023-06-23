# MERN Template

### By Andrew Charlesworth

<hr>

This repository can be used as a starter template for a MERN (MongoDB, Express, React Node) stack project.

The repository is split in to 2 npm projects in [client](./client/) and [server](./server/)

## React Client

The React app was created with create-react-app with some additional dependencies (
see [client package.json](./client/package.json))

To run the react app in development, first ensure you have a running server on the same machine, then:

```bash
cd client
npm install
npm start
```

The [AxiosClient](./client/src/AxiosClient.jsx) component is mounted at the root which provides a client object as a
prop to [App](./client/src/App.jsx). Additional methods may be added to the client object
in [AxiosClient](./client/src/AxiosClient.jsx).

The [AxiosClient](./client/src/AxiosClient.jsx) sets the baseUrl for the server depending on the environment: if in
development (using npm start in the client folder) the baseUrl will point to http://localhost:3001, therefore, you must
ensure that 3001 is the port used for the server when running the server in the development environment.

### Building for production

To have the react app served by the express server for production you can use

```bash
npm run build:toserver
```

... which will build a production optimised react app and copy the necessary files to
the [server's public folder](./server/public/) for static serving. The react app will then be served by '/' on the
server, ready for a production environment.

<hr>

## Express Server

The server's entry point is in [server/main.js](./server/main.js) and its dependencies can be seen in the
server's [package.json](./server/package.json).

As .env files are gitignored, you will have to create your own in [server](./server/). Create an environment file called
development.env for use in a development server, this will ensure that cors is enabled for receiving requests from a
development react app.

The environment file requires 2 variables:

```
MONGODB_URI='<YOUR-MONGODB_URI>'
PORT=3001
```

Port 3001 should be used for development. If you change it, ensure that you also change the baseUrl port in
the [AxiosClient](./client/src/AxiosClient.jsx) component

The server can then be run:

```bash
cd server
npm install
npm start
```

To define other environments, first create an env file with a name e.g. production.env, then create a script in the
server's [package.json](./server/package.json), e.g:

```json
"scrtipts": {
  "start:prod": "NODE_ENV=production node main.js"
}
```

...then you can run with:

```bash
npm run start:prod
```

Note that only the development env will use cors, this can be changed in [server/main.js](./server/main.js)# unit4project
