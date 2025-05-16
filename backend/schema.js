require("dotenv").config();
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

const DELEGATE_FEE = 560;
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
        iGV_Exchange: parseInt(row["iGV"]) || 0,
        oGV_Exchange: parseInt(row["oGV"]) || 0,
        iGTa_Exchange: parseInt(row["iGTa"]) || 0,
        oGTa_Exchange: parseInt(row["oGTa"]) || 0,
        iGTe_Exchange: parseInt(row["iGTe"]) || 0,
        oGTe_Exchange: parseInt(row["oGTe"]) || 0,
      };
    }
  })
  .on("end", () => {
    console.log("✅ Welcome to AIESEC IC ROI Platform");
  });

// GraphQL Type
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
  },
});

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
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
