/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Partner } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToPartner = (data: any): Partner[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
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
};
