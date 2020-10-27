# Verser
Opinionated lightweight nodejs server.

## Usage
You will need to create a routes directory to store your pug.js files.

``` javascript
const { Verser } = require("verser");
const { join } = require("path");

const app = new Verser();

// You can call the routes folder anything
app.listen({ port: 3000, dir: join(__dirname, "routes") });
```