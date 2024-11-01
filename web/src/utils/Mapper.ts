/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoDataError } from "../classes/NoDataError";
import type {
  Exec,
  Partner,
  Social,
  SomePhoto,
  Value,
  Introduction,
  PreviousTeam,
  Event,
  EventGallery,
  Question,
  Ticket,
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
          location: attributes.Location || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToSocials(data: any): Social[] {
    if (!data.socials || !data.socials.data || data.socials.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.socials.data.map((item: any) => {
        const attributes = item.attributes || {};
        return {
          id: item.id,
          type: attributes.Type || "",
          link: attributes.Link || "",
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
          id: item.id,
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

  static mapToEvents(data: any): Event[] {
    if (!data.events || !data.events.data || data.events.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.events.data.map((item: any) => {
        const attributes = item.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.id,
          title: attributes.Title || "",
          description: attributes.Description || "",
          subtitle: attributes.Subtitle || "",
          location: attributes.Location || "",
          locationLink: attributes.Location_Link || "",
          eventDateStart: attributes.Event_Date_Start || "",
          eventDateEnd: attributes.Event_Date_End || "",
          isLive: attributes.Is_Live || false,
          termsAndConditions: attributes.Terms_And_Conditions || "",
          eventCapacityRemaining: attributes.Event_Capacity_Remaining || 0,
          image: imageUrl,
        };
      });
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

  static mapToQuestions(data: any): Question[] {
    if (
      !data.questions ||
      !data.questions.data ||
      data.questions.data.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.questions.data.map((item: any) => {
        const attributes = item.attributes || {};

        return {
          id: item.id,
          question: attributes.Question || "",
          checkForMemberEmail: attributes.Check_For_Member_Email || false,
        };
      });
    }
  }

  static mapToTickets(data: any): Ticket[] {
    if (!data.tickets || !data.tickets.data || data.tickets.data.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.tickets.data.map((item: any) => {
        const attributes = item.attributes || {};

        return {
          id: item.id,
          name: attributes.Name || "",
          discountCode: attributes.Discount_Code || "",
          discountPrice: attributes.Discount_Price || 0,
          price: attributes.Price || 0,
          isMemberOnly: attributes.Is_Member_Only || false,
          isDouble: attributes.Is_Double || false,
          numTicketsLeft: attributes.Number_Tickets_Left || 0,
          ticketDescription: attributes.Ticket_Description || "",
          startDateTicketSales: attributes.Start_Date_Ticket_Sales || "",
          isTicketLive: attributes.Is_Ticket_Live || false,
        };
      });
    }
  }
}
