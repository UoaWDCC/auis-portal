/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Exec,
  Partner,
  Social,
  SomePhoto,
  Value,
  Introduction,
  PreviousTeam,
} from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Mapper {
  static mapToExec(data: any): Exec[] {
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

  static mapToPartner(data: any): Partner[] {
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

  static mapToSocials(data: any): Social[] {
    return data.socials.data.map((item: any) => {
      const attributes = item.attributes || {};
      return {
        id: item.id,
        type: attributes.Type || "",
        link: attributes.Link || "",
      };
    });
  }

  static mapToSomePhotos(data: any): SomePhoto[] {
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

  static mapToValue(data: any): Value[] {
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

  static mapToIntroduction = (data: any): Introduction[] => {
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
  };

  static mapToPreviousTeams = (data: any): PreviousTeam[] => {
    return data.previousTeams.data.map((item: any) => {
      const attributes = item.attributes || {};
      return {
        id: item.id,
        name: attributes.Name || "",
        role: attributes.Role || "",
        year: attributes.Year || "",
      };
    });
  };
}
