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
  GraphQLFloat,
} = require("graphql");

let AIESEC_TOKEN = process.env.AIESEC_TOKEN;

const DELEGATE_FEE = 610; // Constant delegate fee

const feesData = {}; // Object to store all fee details

fs.createReadStream(path.join(__dirname, "fees.csv"))
  .pipe(csv())
  .on("data", (row) => {
    if (row.ID) {
      const id = parseInt(row.ID, 10);
      feesData[id] = {
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
    console.log("✅ Fees Data Loaded:", feesData);
  });

// Committee Type
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }, // MC Name
    delegate_fee: { type: GraphQLInt, resolve: () => DELEGATE_FEE },
    flight_fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.flight_fee || null },
    iGV_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.iGV_Fee || null },
    oGV_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.oGV_Fee || null },
    iGTa_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.iGTa_Fee || null },
    oGTa_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.oGTa_Fee || null },
    iGTe_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.iGTe_Fee || null },
    oGTe_Fee: { type: GraphQLFloat, resolve: (parent) => feesData[parent.id]?.oGTe_Fee || null },
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
              query: `{
                committee(id: ${args.id}) {
                  id
                  name
                }
              }`
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
