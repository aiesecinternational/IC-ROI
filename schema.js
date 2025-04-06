require("dotenv").config();
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
  }
});

// Root Query using local CSV data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    committee: {
      type: CommitteeType,
      args: { id: { type: GraphQLInt } },
      resolve: (_, args) => {
        const data = feesData[args.id];
        if (!data) {
          throw new Error(`Committee with ID ${args.id} not found.`);
        }
        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
