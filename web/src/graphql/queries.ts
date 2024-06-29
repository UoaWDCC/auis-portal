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

export const GET_INTRODUCTION = gql`
  query {
    introductions {
      data {
        id
        attributes {
          Description
          Events
          Members
          Followers
        }
      }
    }
  }
`;

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

export const GET_SOME_PHOTOS = gql`
  query {
    somePhotos {
      data {
        id
        attributes {
          Title
          Year
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

export const GET_VALUES = gql`
  query {
    values {
      data {
        id
        attributes {
          Title
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

export const GET_PREVIOUS_TEAMS = gql`
  query {
    previousTeams {
      data {
        id
        attributes {
          Name
          Role
          Year
        }
      }
    }
  }
`;
