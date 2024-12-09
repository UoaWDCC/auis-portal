import { describe, expect, it } from "vitest";
import {
  PurchasableMembership,
  TicketAndQuestion,
  Value,
} from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToPurchaseableMemberships", () => {
  it("should map valid data correctly", () => {
    const data = {
      purchasableMemberships: {
        data: [
          {
            id: 0,
            attributes: {
              Title: "title",
              Expiry: "1/2/3",
              Price: 24,
              Stripe_Link: "stripe",
              Description: "description",
              Membership_Link_Bypass: false,
              Bypass_Membership_Link: "link",
            },
          },
        ]
      },
    };

    const expected: PurchasableMembership[] = [
      {
        id: 0,
        title: "title",
        expiry: "1/2/3",
        price: 24,
        stripeLink: "stripe",
        description: "description",
        membershipLinkBypass: false,
        bypassMembershipLink: "link",
      },
    ];
    expect(Mapper.mapToPurchasableMemberships(data)).toEqual(expected);
  });

  it("should map invalid data correctly", () => {
    const data = {
        purchasableMemberships: {
          data: [
            {
              id: 0,
              attributes: {
                Title: "",
                Expiry: "",
                Price: 0,
                Stripe_Link: "",
                Description: "",
                Membership_Link_Bypass: false,
                Bypass_Membership_Link: "",
              },
            },
          ]
        },
      };
  
      const expected: PurchasableMembership[] = [
        {
          id: 0,
          title: "",
          expiry: "",
          price: 0,
          stripeLink: "",
          description: "",
          membershipLinkBypass: false,
          bypassMembershipLink: "",
        },
      ];
      expect(Mapper.mapToPurchasableMemberships(data)).toEqual(expected);
    });


  it("should throw NoDataError when values.data is empty", () => {
    const data = {
        purchasableMemberships: {
        data: [],
      },
    };

    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow("No data");
  });

  it("should throw NoDataError when values is missing", () => {
    const data = {};

    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow("No data");
  });

  it("should throw NoDataError when values.data is missing", () => {
    const data = {
      values: {},
    };

    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToPurchasableMemberships(data)).toThrow("No data");
  });
});
