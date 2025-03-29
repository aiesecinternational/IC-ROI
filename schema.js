require("dotenv").config();
console.log("AIESEC_TOKEN in server.js:", process.env.AIESEC_TOKEN); // Debugging
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean
} = require("graphql");
const axios = require("axios");

// Define Programme Type
const ProgrammeType = new GraphQLObjectType({
  name: "Programme",
  fields: {
    short_name: { type: GraphQLString }
  }
});

// Define Programme Fee Type
const ProgrammeFeeType = new GraphQLObjectType({
  name: "ProgrammeFee",
  fields: {
    programme: { type: ProgrammeType }, // Reference the separate ProgrammeType
    fee: { type: GraphQLFloat },
    contract: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    enabled: { type: GraphQLBoolean },
    fee_for: { type: GraphQLString },
    mc_id: { type: GraphQLInt },
    lc_id: { type: GraphQLInt },
    programme_fee_max: { type: GraphQLFloat },
    programme_fee_min: { type: GraphQLFloat }
  }
});

// Define Programme Fees Type (to include total_count)
const ProgrammeFeesType = new GraphQLObjectType({
  name: "ProgrammeFees",
  fields: {
    nodes: { type: new GraphQLList(ProgrammeFeeType) },
    total_count: { type: GraphQLInt }
  }
});

// Define Committee Type
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: {
    name: { type: GraphQLString },
    programme_fees: { type: ProgrammeFeesType },
    project_fee_limit: { type: GraphQLFloat },
    project_fee_limit_cents: { type: GraphQLInt }
  }
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({  // ✅ Wrap fields in a function to avoid reference issues
    test: {
      type: GraphQLString,
      resolve: () => "GraphQL is working!"
    },
    committee: {
      type: CommitteeType,
      args: { id: { type: GraphQLInt } },
      resolve: async (_, args) => {
        try {
            console.log("Using AIESEC_TOKEN in API request:", process.env.AIESEC_TOKEN); // Debugging
    
            const response = await axios.post(
                "https://gis-api.aiesec.org/graphql",
                {
                    query: `
                    {
                      committee(id: ${args.id}) {
                        name
                      }
                    }
                    `
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.AIESEC_TOKEN}`,
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
  })
});

// Export GraphQL Schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
