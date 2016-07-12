const express = 'express';
const graphQLHTTP = 'express-graphql';
const schema = 'schema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000);