const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');

let app = express()
let PORT = 3000

const corsOptions = {
  'credentials': true,
  'origin': 'http://localhost:8080',
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/graphql', cors(corsOptions), graphQLHTTP(req => {
  return {
    schema: schema,
    context: req.session,
  };
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'))

let server = app.listen(PORT, () => {
  let host = server.address().address
  let port = server.address().port

  console.log('Graphql Server listening at http://%s:%s', host, port)
})
