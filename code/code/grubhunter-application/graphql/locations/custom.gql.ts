import gql from "graphql-tag";

export const gqlLocationType = gql`
  directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
  type Location @cacheControl(maxAge: 86400) {
    address: String!
    name: String!
    zipcode: String!
    borough: String!
    cuisine: String!
    grade: String!
    on_wishlist: [String!]! @cacheControl(maxAge: 60)
    location_id: String!
  }
`;
