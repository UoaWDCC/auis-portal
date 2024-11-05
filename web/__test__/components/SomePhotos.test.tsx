// import { MockedProvider } from "@apollo/client/testing";
import { GET_SOME_PHOTOS } from "../../src/graphql/queries";
import { describe, expect, it } from "vitest";
// import { render, screen } from "@testing-library/react";
// import SomePhotos from "../../src/components/SomePhotos";
// import React from "react";
import { GraphQLError } from "graphql";
// import { MemoryRouter } from "react-router-dom";

// // Mock data with some photos
// const mocks = [
//   {
//     request: {
//       query: GET_SOME_PHOTOS,
//     },
//     result: {
//       data: {
//         somePhotos: {
//           data: [
//             {
//               id: 1,
//               attributes: {
//                 Title: "AUIS Stein",
//                 Year: "2024",
//                 Image: {
//                   data: {
//                     attributes: {
//                       url: "/uploads/john_doe.jpg",
//                     },
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
// ];

// // Mock for no data case
// const noDataMock = {
//   request: {
//     query: GET_SOME_PHOTOS,
//   },
//   result: {
//     data: {
//       somePhotos: {
//         data: [],
//       },
//     },
//   },
// };

// // Mock for error case
// const errorMock = {
//   request: {
//     query: GET_SOME_PHOTOS,
//   },
//   result: {
//     errors: [new GraphQLError("Error!")],
//   },
// };

describe("SomePhotos Component", () => {
  it.todo("add test cases");

  // it("renders loading spinner", async () => {
  //   render(
  //     <MemoryRouter>
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <SomePhotos />
  //       </MockedProvider>
  //     </MemoryRouter>
  //   );
  //   // Ensure the loading spinner is displayed
  //   expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  //   // Wait for the mocked data to load and the spinner to be removed
  //   await screen.findByText("AUIS Stein");
  // });
  // it("renders the mocked data", async () => {
  //   render(
  //     <MemoryRouter>
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <SomePhotos />
  //       </MockedProvider>
  //     </MemoryRouter>
  //   );
  //   // Wait for the data to load
  //   await screen.findByText("AUIS Stein");
  //   await screen.findByText("2024");
  // });
  // it("renders error message", async () => {
  //   render(
  //     <MemoryRouter>
  //       <MockedProvider mocks={[errorMock]} addTypename={false}>
  //         <SomePhotos />
  //       </MockedProvider>
  //     </MemoryRouter>
  //   );
  //   // Wait for the error message to be displayed
  //   expect(await screen.findByText("CMS Offline")).toBeInTheDocument();
  // });
  // it("renders 'no photos' message when there is no data", async () => {
  //   render(
  //     <MemoryRouter>
  //       <MockedProvider mocks={[noDataMock]} addTypename={false}>
  //         <SomePhotos />
  //       </MockedProvider>
  //     </MemoryRouter>
  //   );
  //   // Wait for the "no photos" message to be displayed
  //   expect(
  //     await screen.findByText("There are no photos to display")
  //   ).toBeInTheDocument();
  // });
});
