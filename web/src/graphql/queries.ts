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

export const GET_EVENTS = gql`
  query {
    events {
      data {
        id
        attributes {
          Title
          Description
          Subtitle
          Location
          Location_Link
          Event_Date_Start
          Event_Date_End
          Is_Live
          Terms_And_Conditions
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

export const GET_EVENTS_GALLERY = gql`
  query {
    events {
      data {
        id
        attributes {
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

export const GET_QUESTIONS = gql`
  query {
    questions {
      data {
        id
        attributes {
          Question
          Check_For_Member_Email
        }
      }
    }
  }
`;
