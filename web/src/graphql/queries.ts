import { gql } from "@apollo/client";

export const GET_EXECS = gql`
  query {
    execs {
      data {
        id
        attributes {
          Name
          Description
          Position
          Role
          Image {
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

export const GET_PARTNERS = gql`
  query {
    partners {
      data {
        id
        attributes {
          Type
          Name
          Location
          Description
          Image {
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

export const GET_INTRODUCTION = "";

export const GET_SOCIALS = gql`
  query {
    socials {
      data {
        id
        attributes {
          Type
          Link
        }
      }
    }
  }
`;

export const GET_SOME_PHOTOS = "";

export const GET_VALUES = "";
