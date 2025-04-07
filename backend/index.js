require("dotenv").config(); // Load .env variables
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema"); // Import GraphQL schema

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL UI
  })
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
});
