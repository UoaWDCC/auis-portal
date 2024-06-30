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

  static mapToIntroduction = (data: any): Introduction[] => {
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
