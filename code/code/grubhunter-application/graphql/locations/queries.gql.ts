import gql from "graphql-tag";

export const queryDefs = gql`
  type Query {
    allLocations: [Location]!
    locationsById(location_id: String): [Location]!
    onUsersWishlist(userId: String): [Location]!
  }
`;
