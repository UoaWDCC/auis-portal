/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Social } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToSocials = (data: any): Social[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
  return data.socials.data.map((item: any) => {
    const attributes = item.attributes || {};
    return {
      id: item.id,
      type: attributes.Type || "",
      link: attributes.Link || "",
    };
  });
};
