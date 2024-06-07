import { describe, expect, it } from "vitest";
import { mapToExec } from "../src/utils/mapToExec";
import { Exec } from "../src/types/types";

describe("mapToExec", () => {
  it("should map valid data correctly", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: {
            name: "Guryash",
            bio: "A great leader",
            position: "President",
            image: {
              data: {
                attributes: {
                  url: "/uploads/john_doe.jpg",
                },
              },
            },
          },
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        bio: "A great leader",
        position: "President",
        image: "/uploads/john_doe.jpg",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: {
            name: "Guryash",
            bio: "A great vice president",
            position: "Vice President",
            image: null,
          },
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        bio: "A great vice president",
        position: "Vice President",
        image: "",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });

  it("should handle missing name field gracefully", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: {
            name: null,
            bio: "A great treasurer",
            position: "Treasurer",
            image: {
              data: {
                attributes: {
                  url: "/uploads/jane_doe.jpg",
                },
              },
            },
          },
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "",
        bio: "A great treasurer",
        position: "Treasurer",
        image: "/uploads/jane_doe.jpg",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });

  it("should handle missing bio field gracefully", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: {
            name: "Guryash",
            bio: null,
            position: "Secretary",
            image: {
              data: {
                attributes: {
                  url: "/uploads/john_smith.jpg",
                },
              },
            },
          },
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        bio: "",
        position: "Secretary",
        image: "/uploads/john_smith.jpg",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });

  it("should handle missing position field gracefully", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: {
            name: "Guryash",
            bio: "A great secretary",
            position: null,
            image: {
              data: {
                attributes: {
                  url: "/uploads/john_smith.jpg",
                },
              },
            },
          },
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        bio: "A great secretary",
        position: "",
        image: "/uploads/john_smith.jpg",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      data: [
        {
          id: 1,
          attributes: null,
        },
      ],
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "",
        bio: "",
        position: "",
        image: "",
      },
    ];

    expect(mapToExec(data)).toEqual(expected);
  });
});
