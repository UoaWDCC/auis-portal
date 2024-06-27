import { describe, expect, it } from "vitest";
import { SomePhoto } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";

describe("mapToSomePhotos", () => {
  it("should map valid data correctly", () => {
    const data = {
      somePhotos: {
        data: [
          {
            id: 1,
            attributes: {
              Title: "Nature",
              Year: "2023",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/nature.jpg",
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              Title: "Cityscape",
              Year: "2022",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/cityscape.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: SomePhoto[] = [
      {
        id: 1,
        title: "Nature",
        year: "2023",
        image: "/uploads/nature.jpg",
      },
      {
        id: 2,
        title: "Cityscape",
        year: "2022",
        image: "/uploads/cityscape.jpg",
      },
    ];

    expect(Mapper.mapToSomePhotos(data)).toEqual(expected);
  });

  it("should handle missing Title field gracefully", () => {
    const data = {
      somePhotos: {
        data: [
          {
            id: 3,
            attributes: {
              Title: null,
              Year: "2024",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/abstract.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: SomePhoto[] = [
      {
        id: 3,
        title: "",
        year: "2024",
        image: "/uploads/abstract.jpg",
      },
    ];

    expect(Mapper.mapToSomePhotos(data)).toEqual(expected);
  });

  it("should handle missing Year field gracefully", () => {
    const data = {
      somePhotos: {
        data: [
          {
            id: 4,
            attributes: {
              Title: "Portrait",
              Year: null,
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/portrait.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: SomePhoto[] = [
      {
        id: 4,
        title: "Portrait",
        year: "",
        image: "/uploads/portrait.jpg",
      },
    ];

    expect(Mapper.mapToSomePhotos(data)).toEqual(expected);
  });

  it("should handle missing Image field gracefully", () => {
    const data = {
      somePhotos: {
        data: [
          {
            id: 5,
            attributes: {
              Title: "Abstract",
              Year: "2025",
              Image: null,
            },
          },
        ],
      },
    };

    const expected: SomePhoto[] = [
      {
        id: 5,
        title: "Abstract",
        year: "2025",
        image: "",
      },
    ];

    expect(Mapper.mapToSomePhotos(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      somePhotos: {
        data: [
          {
            id: 6,
            attributes: null,
          },
        ],
      },
    };

    const expected: SomePhoto[] = [
      {
        id: 6,
        title: "",
        year: "",
        image: "",
      },
    ];

    expect(Mapper.mapToSomePhotos(data)).toEqual(expected);
  });
});
