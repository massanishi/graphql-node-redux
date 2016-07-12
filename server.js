const express = require("express");
const graphql = require('graphql');
const graphQLHTTP = require('express-graphql');
const cors = require("cors");
const bodyParser = require("body-parser");
const schema = require('./app/schema');

const app = express();
const PORT = 3000;

const corsOptions = {
  "credentials": true,
  "origin": "http://localhost:8080",
};
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/graphql', graphQLHTTP(req => {
	return ({
	  schema: schema,
	  pretty: true,
	})
}));

// serve static files from current directory;
app.use(express.static(__dirname + "/"));

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Falcor Server listening at http://%s:%s", host, port);
});
