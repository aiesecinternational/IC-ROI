require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");

let AIESEC_TOKEN = process.env.AIESEC_TOKEN;

const DELEGATE_FEE = 610; // Constant delegate fee

const flightFees = {};
fs.createReadStream(path.join(__dirname, "flight_fees.csv"))
  .pipe(csv())
  .on("data", (row) => {
    console.log(row); // Debugging: Check what data is being read
    if (row.Country && row.Price) { // Ensure correct column names
      flightFees[row.Country] = parseFloat(row.Price) || null;
    }
  })
  .on("end", () => {
    console.log("✅ Flight Fees Loaded:", flightFees);
  });

// Programme Type
const ProgrammeType = new GraphQLObjectType({
  name: "Programme",
  fields: {
    short_name: { type: GraphQLString }
  }
});

// Programme Fee Type
const ProgrammeFeeType = new GraphQLObjectType({
  name: "ProgrammeFee",
  fields: {
    programme: { type: ProgrammeType },
    fee: { type: GraphQLFloat }
  }
});

// Committee Type
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }, // MC Name
    delegate_fee: { type: GraphQLInt, resolve: () => DELEGATE_FEE }, // Constant 610
    flight_fee: { 
      type: GraphQLFloat, 
      resolve: (parent) => flightFees[parent.id] || null // Get flight fee from CSV
    },
    programme_fees: { 
      type: new GraphQLList(ProgrammeFeeType),
      resolve: (parent) => parent.programme_fees.nodes || []
    }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    committee: {
      type: CommitteeType,
      args: { id: { type: GraphQLInt } },
      resolve: async (_, args) => {
        try {
          const response = await axios.post(
            "https://gis-api.aiesec.org/graphql",
            {
              query: `
              {
                committee(id: ${args.id}) {
                  id
                  name
                  programme_fees(first: 29) {
                    nodes {
                      programme { short_name }
                      fee
                    }
                  }
                }
              }
              `                  
            },
            {
              headers: {
                "Authorization": AIESEC_TOKEN,
                "Content-Type": "application/json"
              }
            }
          );

          return response.data.data.committee;
        } catch (error) {
          console.error("Error fetching data:", error.response?.data || error.message);
          throw new Error("Error fetching data: " + error.message);
        }
      }
    }
  }
});

// Export GraphQL Schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
