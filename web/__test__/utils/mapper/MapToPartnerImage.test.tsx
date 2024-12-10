import { describe, expect, it } from "vitest";
import { PartnerImage } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToPartnerImage", () => {
  it("should map valid data correctly", () => {
    const data = {
      partners: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Partner One",
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

    const expected: PartnerImage[] = [
      {
        id: 1,
        name: "Partner One",
        image: "/uploads/partner_one.jpg",
      },
    ];

    expect(Mapper.mapToPartnerImage(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 2,
            attributes: {
              Name: "Partner Two",
              Image: null,
            },
          },
        ],
      },
    };

    const expected: PartnerImage[] = [
      {
        id: 2,
        name: "Partner Two",
        image: "",
      },
    ];

    expect(Mapper.mapToPartnerImage(data)).toEqual(expected);
  });

  it("should handle missing name field gracefully", () => {
    const data = {
      partners: {
        data: [
          {
            id: 3,
            attributes: {
              Name: null,
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

    const expected: PartnerImage[] = [
      {
        id: 3,
        name: "",
        image: "/uploads/partner_three.jpg",
      },
    ];

    expect(Mapper.mapToPartnerImage(data)).toEqual(expected);
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

    const expected: PartnerImage[] = [
      {
        id: 6,
        name: "",
        image: "",
      },
    ];

    expect(Mapper.mapToPartnerImage(data)).toEqual(expected);
  });

  it("should throw NoDataError when partners.data is empty", () => {
    const data = {
      partners: {
        data: [],
      },
    };

    expect(() => Mapper.mapToPartnerImage(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartnerImage(data)).toThrow("No data");
  });

  it("should throw NoDataError when partners is missing", () => {
    const data = {};

    expect(() => Mapper.mapToPartnerImage(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartnerImage(data)).toThrow("No data");
  });

  it("should throw NoDataError when partners.data is missing", () => {
    const data = {
      partners: {},
    };

    expect(() => Mapper.mapToPartnerImage(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPartnerImage(data)).toThrow("No data");
  });
});
