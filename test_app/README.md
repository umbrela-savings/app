# Test App Front-end

Front-end of the Umbrela app

## How to run
- Before running, make sure you are in the current directory, and make sure you have the [dependencies](https://facebook.github.io/react-native/docs/getting-started) installed for the iOS platform.

- Install the dependencies with the command:
`npm install`

- Install [JSON Server](https://github.com/typicode/json-server):
`npm install -g json-server`

- Start the server with:
`json-server --watch db.json`

- In another terminal within the same directory, run
`react-native run-ios`

> NOTE: This code does not work on actual phones or the Android simulator due to the inability to reach the local server.
