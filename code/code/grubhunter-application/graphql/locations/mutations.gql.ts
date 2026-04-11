import gql from "graphql-tag";

export const mutationDefs = gql`
  type Mutation {
    addWishlist(location_id: String, user_id: String): [Location]!
    removeWishlist(location_id: String, user_id: String): [Location]!
  }
`;
