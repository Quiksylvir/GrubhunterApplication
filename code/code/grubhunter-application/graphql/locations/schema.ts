import gql from "graphql-tag";
import { gqlLocationType } from "./custom.gql";
import { queryDefs } from "./queries.gql";
import { mutationDefs } from "./mutations.gql";

const placeholderTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
export const typeDefs = [
  placeholderTypeDefs,
  gqlLocationType,
  queryDefs,
  mutationDefs,
];
