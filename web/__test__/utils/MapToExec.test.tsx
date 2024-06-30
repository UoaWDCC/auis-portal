import { describe, expect, it } from "vitest";
import { Exec } from "../../src/types/types";
import { Mapper } from "../../src/utils/Mapper";

describe("mapToExec", () => {
  it("should map valid data correctly", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Guryash",
              Description: "A great leader",
              Position: "President",
              Role: "Leader",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/john_doe.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        description: "A great leader",
        position: "President",
        role: "Leader",
        image: "/uploads/john_doe.jpg",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle missing image field gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Guryash",
              Description: "A great vice president",
              Position: "Vice President",
              Role: "Vice Leader",
              Image: null,
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        description: "A great vice president",
        position: "Vice President",
        role: "Vice Leader",
        image: "",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle missing name field gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: null,
              Description: "A great treasurer",
              Position: "Treasurer",
              Role: "Finance",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/jane_doe.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "",
        description: "A great treasurer",
        position: "Treasurer",
        role: "Finance",
        image: "/uploads/jane_doe.jpg",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle missing description field gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Guryash",
              Description: null,
              Position: "Secretary",
              Role: "Organizer",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/john_smith.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        description: "",
        position: "Secretary",
        role: "Organizer",
        image: "/uploads/john_smith.jpg",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle missing position field gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Guryash",
              Description: "A great secretary",
              Position: null,
              Role: "Organizer",
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/john_smith.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        description: "A great secretary",
        position: "",
        role: "Organizer",
        image: "/uploads/john_smith.jpg",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle missing role field gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: {
              Name: "Guryash",
              Description: "A great member",
              Position: "Member",
              Role: null,
              Image: {
                data: {
                  attributes: {
                    url: "/uploads/john_doe.jpg",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "Guryash",
        description: "A great member",
        position: "Member",
        role: "",
        image: "/uploads/john_doe.jpg",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      execs: {
        data: [
          {
            id: 1,
            attributes: null,
          },
        ],
      },
    };

    const expected: Exec[] = [
      {
        id: 1,
        name: "",
        description: "",
        position: "",
        role: "",
        image: "",
      },
    ];

    expect(Mapper.mapToExec(data)).toEqual(expected);
  });
});