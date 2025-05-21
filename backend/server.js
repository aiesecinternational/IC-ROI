require("dotenv").config(); // Load .env variables
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors');
const schema = require("./schema");

const app = express();

// ✅ CORS middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Needed for preflight requests
app.options('*', cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}/graphql`);
});