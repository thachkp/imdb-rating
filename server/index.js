const express = require('express')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const router = express.Router();
const bodyParser = require("body-parser");

// routes
const api = require("./router/api");

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');


app.use(router);
app.use(bodyParser.json());
app.use("/api", api);

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
