import { gql } from "@apollo/client";

export const GET_EXECS = gql`
  query {
    execs {
      data {
        id
        attributes {
          name
          bio
          position
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
