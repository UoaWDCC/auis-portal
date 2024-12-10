import { describe, expect, it } from "vitest";
import { Partner } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToPartner", () => {
  it("should map valid data correctly", () => {
    const data = {
      partners: {
        data: [
          {
            id: 1,
            attributes: {
              Type: "Gold",
              Name: "Partner One",
              Description: "A leading business partner",
              Location: "Farm",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_one.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 1,
        type: "Gold",
        name: "Partner One",
        description: "A leading business partner",
        location: "Farm",
        image: "/uploads/partner_one.jpg",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 2,
            attributes: {
              Type: "Silver",
              Name: "Partner Two",
              Description: "A technology partner",
              Location: "City",
              Image: null,
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 2,
        type: "Silver",
        name: "Partner Two",
        description: "A technology partner",
        location: "City",
        image: "",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle missing name field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 3,
            attributes: {
              Type: "Bronze",
              Name: null,
              Description: "A finance partner",
              Location: "Town",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_three.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 3,
        type: "Bronze",
        name: "",
        description: "A finance partner",
        location: "Town",
        image: "/uploads/partner_three.jpg",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle missing description field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 4,
            attributes: {
              Type: "Healthcare",
              Name: "Partner Four",
              Description: null,
              Location: "Village",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_four.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 4,
        type: "Healthcare",
        name: "Partner Four",
        description: "",
        location: "Village",
        image: "/uploads/partner_four.jpg",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle missing type field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 5,
            attributes: {
              Type: null,
              Name: "Partner Five",
              Description: "A healthcare partner",
              Location: "Island",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_five.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 5,
        type: "",
        name: "Partner Five",
        description: "A healthcare partner",
        location: "Island",
        image: "/uploads/partner_five.jpg",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 6,
            attributes: null,
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 6,
        type: "",
        name: "",
        description: "",
        location: "",
        image: "",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });

  it("should handle missing location field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 7,
            attributes: {
              Type: "Education",
              Name: "Partner Seven",
              Description: "An education partner",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/partner_seven.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Partner[] = [
      {
        id: 7,
        type: "Education",
        name: "Partner Seven",
        description: "An education partner",
        location: "",
        image: "/uploads/partner_seven.jpg",
      },
    ];

    expect(Mapper.mapToPartner(data)).toEqual(expected);
  });
  it("should throw NoDataError when partners.data is empty", () => {
    const data = {
      partners: {
        data: [],
      },
    };

    expect(() => Mapper.mapToPartner(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartner(data)).toThrow("No data");
  });

  it("should throw NoDataError when partners is missing", () => {
    const data = {};

    expect(() => Mapper.mapToPartner(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartner(data)).toThrow("No data");
  });

  it("should throw NoDataError when partners.data is missing", () => {
    const data = {
      partners: {},
    };

    expect(() => Mapper.mapToPartner(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartner(data)).toThrow("No data");
  });
});
