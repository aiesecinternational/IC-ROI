require("dotenv").config(); // Load .env variables
console.log("AIESEC_TOKEN in schema.js:", process.env.AIESEC_TOKEN); // Debugging
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require("graphql");

const DELEGATE_FEE = 615;
const feesData = {};

// Load CSV data
fs.createReadStream(path.join(__dirname, "fees.csv"))
  .pipe(csv())
  .on("data", (row) => {
    if (row.ID) {
      const id = parseInt(row.ID, 10);
      feesData[id] = {
        id,
        name: row.Country,
        flight_fee: parseFloat(row.Price) || null,
        iGV_Fee: parseFloat(row["iGV Fee"]) || null,
        oGV_Fee: parseFloat(row["OGV Fee"]) || null,
        iGTa_Fee: parseFloat(row["iGTa Fee"]) || null,
        oGTa_Fee: parseFloat(row["OGTa Fee"]) || null,
        iGTe_Fee: parseFloat(row["iGTe Fee"]) || null,
        oGTe_Fee: parseFloat(row["OGTe Fee"]) || null,
      };
    }
  })
  .on("end", () => {
    console.log("✅ Welcome to AIESEC IC ROI Platform");
  });

// Committee Type
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    delegate_fee: { type: GraphQLInt, resolve: () => DELEGATE_FEE },
    flight_fee: { type: GraphQLFloat },
    iGV_Fee: { type: GraphQLFloat },
    oGV_Fee: { type: GraphQLFloat },
    iGTa_Fee: { type: GraphQLFloat },
    oGTa_Fee: { type: GraphQLFloat },
    iGTe_Fee: { type: GraphQLFloat },
    oGTe_Fee: { type: GraphQLFloat },
    iGV_Exchange: { type: GraphQLInt },
    oGV_Exchange: { type: GraphQLInt },
    iGTa_Exchange: { type: GraphQLInt },
    oGTa_Exchange: { type: GraphQLInt },
    iGTe_Exchange: { type: GraphQLInt },
    oGTe_Exchange: { type: GraphQLInt },
  }
});

// Helper: Get analytics numbers
async function fetchExchangeNumbers(mc_id) {
  const access_token = process.env.AIESEC_ACCESS_TOKEN;
  const today = new Date().toISOString().split("T")[0];
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const start_date = lastYear.toISOString().split("T")[0];

  const url = `https://analytics.api.aiesec.org/v2/applications/analyze?access_token=${access_token}&start_date=${start_date}&end_date=${today}&performance_v3[office_id]=${mc_id}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      iGV_Exchange: data.i_realized_7?.doc_count || 0,
      oGV_Exchange: data.o_approved_7?.doc_count || 0,
      iGTa_Exchange: data.i_realized_8?.doc_count || 0,
      oGTa_Exchange: data.o_approved_8?.doc_count || 0,
      iGTe_Exchange: data.i_realized_9?.doc_count || 0,
      oGTe_Exchange: data.o_approved_9?.doc_count || 0,
    };
  } catch (error) {
    console.error("Analytics API error:", error.response?.data || error.message);
    return {
      iGV_Exchange: 0,
      oGV_Exchange: 0,
      iGTa_Exchange: 0,
      oGTa_Exchange: 0,
      iGTe_Exchange: 0,
      oGTe_Exchange: 0,
    };
  }
}

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    committee: {
      type: CommitteeType,
      args: {
        id: { type: GraphQLInt },
        is_performance_base: { type: GraphQLBoolean },
      },
      resolve: async (_, args) => {
        const data = feesData[args.id];
        if (!data) {
          throw new Error(`Committee with ID ${args.id} not found.`);
        }

        // If performance-based, merge in exchange numbers
        if (args.is_performance_base) {
          const exchangeData = await fetchExchangeNumbers(args.id);
          return { ...data, ...exchangeData };
        }

        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
