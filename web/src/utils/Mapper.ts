/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoDataError } from "../classes/NoDataError";
import type {
  Exec,
  Partner,
  SomePhoto,
  Value,
  Introduction,
  PreviousTeam,
  EventGallery,
  PurchasableMembership,
  EventAndTickets,
  TicketAndQuestion,
  PartnerImage,
  EventsSlider,
} from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Mapper {
  static mapToExec(data: any): Exec[] {
    if (!data.execs || !data.execs.data || data.execs.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.execs.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          name: attributes.Name || "",
          description: attributes.Description || "",
          position: attributes.Position || "",
          role: attributes.Role || "",
          linkedInLink: attributes.Linked_In_Link || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToPartnerImage(data: any): PartnerImage[] {
    if (
      !data.partners ||
      !data.partners.data ||
      data.partners.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.partners.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";
        return {
          id: item.id,
          name: attributes.Name || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToPartner(data: any): Partner[] {
    if (
      !data.partners ||
      !data.partners.data ||
      data.partners.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.partners.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          type: attributes.Type || "",
          name: attributes.Name || "",
          description: attributes.Description || "",
          link: attributes.Link || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToSomePhotos(data: any): SomePhoto[] {
    if (
      !data.somePhotos ||
      !data.somePhotos.data ||
      data.somePhotos.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.somePhotos.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          title: attributes.Title || "",
          year: attributes.Year || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToValue(data: any): Value[] {
    if (!data.values || !data.values.data || data.values.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.values.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          title: attributes.Title || "",
          description: attributes.Description || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToIntroduction(data: any): Introduction[] {
    if (
      !data.introductions ||
      !data.introductions.data ||
      data.introductions.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.introductions.data.map((item: any) => {
        const attributes = item.attributes || {};
        return {
          description: attributes.Description || "",
          events: attributes.Events || "",
          members: attributes.Members || "",
          followers: attributes.Followers || "",
        };
      });
    }
  }

  static mapToPreviousTeams(data: any): PreviousTeam[] {
    if (
      !data.previousTeams ||
      !data.previousTeams.data ||
      data.previousTeams.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.previousTeams.data.map((item: any) => {
        const attributes = item.attributes || {};
        return {
          id: item.id,
          name: attributes.Name || "",
          role: attributes.Role || "",
          year: attributes.Year || "",
        };
      });
    }
  }

  static mapToEventsSlider(data: any): EventsSlider[] {
    if (!data.events || !data.events.data || data.events.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.events.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          title: attributes.Title || "",
          location: attributes.Location || "",
          eventDateStart: attributes.Event_Date_Start || "",
          isLive: attributes.Is_Live || false,
          image: imageUrl,
        };
      });
    }
  }

  static mapToEvent(data: any): EventAndTickets {
    if (!data.event || !data.event.data || data.event.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      const attributes = data.event.data.attributes || {};
      const imageUrl = attributes.Image?.data?.attributes?.url || "";
      return {
        title: attributes.Title || "",
        description: attributes.Description || "",
        subtitle: attributes.Subtitle || "",
        location: attributes.Location || "",
        eventDateStart: attributes.Event_Date_Start || "",
        eventDateEnd: attributes.Event_Date_End || "",
        termsAndConditions: attributes.Terms_And_Conditions || "",
        eventCapacityRemaining: attributes.Event_Capacity_Remaining || 0,
        isLive: attributes.Is_Live || false,
        image: imageUrl,
        tickets: attributes.Ticket_ID.data.map((item: any) => {
          const attributesTicket = item.attributes || {};
          return {
            id: item.id,
            name: attributesTicket.Name || "",
            price: attributesTicket.Price || 0,
            isMemberOnly: attributesTicket.Is_Member_Only || false,
            isDouble: attributesTicket.Is_Double || false,
            numTicketsLeft: attributesTicket.Number_Tickets_Left || 0,
            ticketDescription: attributesTicket.Ticket_Description || "",
            startDateTicketSales:
              attributesTicket.Start_Date_Ticket_Sales || "",
            isTicketLive: attributesTicket.Is_Ticket_Live || false,
            ticketLinkBypass: attributesTicket.Ticket_Link_Bypass || false,
            bypassTicketLink: attributesTicket.Bypass_Ticket_Link || "",
            stripeLink: attributesTicket.Stripe_Link || "",
          };
        }),
      };
    }
  }

  static mapToTicketQuestion(data: any): TicketAndQuestion {
    if (!data.ticket || !data.ticket.data || data.ticket.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      const attributes = data.ticket.data.attributes || {};
      return {
        ticketId: data.ticket.data.id,
        questions: attributes.Question_ID.data.map((item: any) => {
          const attributesTicket = item.attributes || {};
          return {
            id: item.id,
            question: attributesTicket.Question || "",
          };
        }),
      };
    }
  }

  static mapToEventsGallery(data: any): EventGallery[] {
    if (
      !data.eventGalleries ||
      !data.eventGalleries.data ||
      data.eventGalleries.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.eventGalleries.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          image: imageUrl || "",
        };
      });
    }
  }

  static mapToPurchasableMemberships(data: any): PurchasableMembership[] {
    if (
      !data.purchasableMemberships ||
      !data.purchasableMemberships.data ||
      data.purchasableMemberships.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.purchasableMemberships.data.map((item: any) => {
        const attributes = item.attributes || {};
        return {
          id: item.id,
          title: attributes.Title,
          expiry: attributes.Expiry,
          price: attributes.Price || 0,
          stripeLink: attributes.Stripe_Link,
          description: attributes.Description,
          membershipLinkBypass: attributes.Membership_Link_Bypass || false,
          bypassMembershipLink: attributes.Bypass_Membership_Link || "",
        };
      });
    }
  }
}
